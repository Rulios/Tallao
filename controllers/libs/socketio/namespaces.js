"use strict";

const GetPublicID = require("../GetPublicID");
const GetSocketRequestSession = require("../GetSocketRequestSession");
const submitOrder = require("../../Orders/submit");

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

module.exports = function(io, middlewares){
    const laundryNsp = io.of("/laundry");
    const userNsp = io.of("/user");

    setMiddlewares(laundryNsp, middlewares);

    laundryNsp.on("connection",async socket =>{

        try{
            //console.log(socket.request.session);
            const {userType, hashcode} = GetSocketRequestSession(socket);
            const laundryInitials = await GetPublicID("laundry", hashcode);
        
            //handshake validation
            if(!laundryInitials) socket.disconnect();
            if(userType !== "laundry") socket.disconnect();
        
            //join its own laundry room by its own laundryInitials
            socket.join(laundryInitials);
        
            socket.on("submit-order", async order =>{
                submitOrder(io, socket, order);
            });

            
        }catch(err){
            console.log(err );
            socket.disconnect();
        }

    });
}

function setMiddlewares(namespace, middlewares){
    middlewares.map(middleware =>{
        namespace.use(wrap(middleware));
    });
}
