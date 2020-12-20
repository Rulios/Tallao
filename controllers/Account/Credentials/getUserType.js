module.exports = function(credentials){
    credentials.get("/getUsertype", function(req,res){
        try{
            const {hashcode, userType} = req.session;
            if(!hashcode || !userType) throw new Error();

            return res.status(200).send(userType);
        }catch(err){
            return res.status(500).end();
        }
    });
}