const client =require("../libs/DB_CONNECT");

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const getLanguageStrings = require("../../translation/backend/get-language-strings");

module.exports = function(feedback) {
 
    feedback.post("/submit", async function(req,res){

        try{
            let {comments} = req.body;

            await insertFeedback(comments);

            return res.render("pages/feedback/success", getLanguageStrings(req));

        }catch(err){
            return res.redirect("/");
        }
    });
}

async function insertFeedback(comments){
    const QUERY = buildQuery();
    const CREATED_AT = dayjs.utc().format();

    await client.query(QUERY, [comments, CREATED_AT]);

}

function buildQuery(){
    return `
        INSERT INTO feedback
        (comment, created_at)
        VALUES ($1, $2::timestamptz)
        LIMIT 1;
    `;
}