"use strict";

module.exports.set = function(app){
    app.post("/logout", function(req,res){
        req.session.destroy(() =>{
            res.status(200).end();
        });
    });
};