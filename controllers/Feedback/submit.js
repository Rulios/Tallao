const client =require("../libs/DB_CONNECT");
const dayjs = require("dayjs");
const {DATE_TIME_FORMAT_UNTIL_MINUTES} = require("../../meta/DATE_TIME_FORMATS");

module.exports = function(feedback) {
 
    feedback.post("/submit", async function(req,res){

        try{
            let {comments} = req.body;

            await insertFeedback(comments);

            return res.render("pages/feedback/success");

        }catch(err){
            return res.redirect("/");
        }
    });
}

async  function insertFeedback(comments){


    const QUERY = buildQuery();
    const CREATED_AT = dayjs().format(DATE_TIME_FORMAT_UNTIL_MINUTES);

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