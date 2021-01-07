const client = require("../libs/DB_CONNECT");
const isUserVerified = require("./is-user-verified");
const dayjs =  require("dayjs");
const path = require("path");
const GetEmail = require("../libs/get/email");
const createAndSaveToken = require("../libs/email-verification/create-and-save-token");
const sendEmailVerification = require("../libs/email-verification/send-email-verification");

const {DATE_TIME_FORMAT_UNTIL_MINUTES} = require("../../meta/DATE_TIME_FORMATS");

const MAX_DURATION_HOURS = 48;

const ROOT = path.dirname(require.main.filename);

module.exports = function(emailVerification){
    emailVerification.get("/:token", async function(req,res){

        try {
            
            let token = req.params.token;
            let todayDateTime = dayjs().format(DATE_TIME_FORMAT_UNTIL_MINUTES);
            let {hashcode, created_at} = await getHashcodeAndCreatedAt(token);

            if(await isUserVerified(hashcode)) return res.render(alreadyVerifiedPage());

            if(!isTokenOnRange(todayDateTime, created_at)){
                //resend with new token
                let email = await GetEmail(hashcode, "user");

                await sendEmailVerification(req.headers.host ,email, await createAndSaveToken(hashcode));
                return res.render(expiredTokenPage());   
            }

            await setUserAsVerified(hashcode);

            return res.render(verifiedPage());

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
    return "pages/emailVerification/alreadyVerified";
}

function isTokenOnRange(todayDateTime, created_at){
    return dayjs(todayDateTime).diff(created_at, "hour") <= MAX_DURATION_HOURS;
}

function expiredTokenPage(){
    return "pages/emailVerification/expiredToken";
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
    return "pages/emailVerification/verified"
}