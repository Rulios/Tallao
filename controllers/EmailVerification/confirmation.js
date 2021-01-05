const client = require("../libs/DBConnect");
const isUserVerified = require("./isUserVerified");
const dayjs =  require("dayjs");
const path = require("path");
const GetEmail = require("../libs/GetEmail");
const createAndSaveToken = require("../libs/emailVerification/createAndSaveToken");
const sendEmailVerification = require("../libs/emailVerification/sendEmailVerification");

const {DATE_TIME_FORMAT_UNTIL_MINUTES} = require("../libs/DATE_TIME_FORMATS");

const MAX_DURATION_HOURS = 48;

const ROOT = path.dirname(require.main.filename);

module.exports = function(emailVerification){
    emailVerification.get("/:token", async function(req,res){

        try {
            
            let token = req.params.token;
            let todayDateTime = dayjs().format(DATE_TIME_FORMAT_UNTIL_MINUTES);
            let {hashcode, created_at} = await getHashcodeAndCreatedAt(token);

            if(await isUserVerified(hashcode)) return res.sendFile(alreadyVerifiedPage());

            if(!isTokenOnRange(todayDateTime, created_at)){
                //resend with new token
                let email = await GetEmail(hashcode, "user");

                await sendEmailVerification(req.headers.host ,email, await createAndSaveToken(hashcode));
                return res.sendFile(expiredTokenPage());   
            }

            await setUserAsVerified(hashcode);

            return res.sendFile(verifiedPage());

        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }

    }); 
}

async function getHashcodeAndCreatedAt(token){
    const QUERY = `
        SELECT hashcode, created_at
        FROM verification_tokens
        WHERE token = $1
        LIMIT 1;
    `;
    
    let results = (await client.query(QUERY, [token])).rows[0];
    return {...results};
}

function alreadyVerifiedPage(){
    return path.resolve(ROOT + "/public/emailVerification/alreadyVerified.html");
}

function isTokenOnRange(todayDateTime, created_at){
    return dayjs(todayDateTime).diff(created_at, "hour") <= MAX_DURATION_HOURS;
}

function expiredTokenPage(){
    return path.resolve(ROOT + "/public/emailVerification/expiredToken.html");
}

async function setUserAsVerified(hashcode){
    const VERIFIED = true;
    const QUERY = `
        UPDATE users 
        SET verified = $1
        WHERE hashcode = $2;
    `;

    await client.query(QUERY, [VERIFIED, hashcode]);
}

function verifiedPage(){
    return path.resolve(ROOT + "/public/emailVerification/verified.html");
}