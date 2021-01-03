"use strict";

module.exports = function(log){
    log.post("/logout", function(req,res){
        req.session.destroy(() =>{
            res.status(200).end();
        });
    });
};