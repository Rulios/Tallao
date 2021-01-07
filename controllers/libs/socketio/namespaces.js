"use strict";

const GetPublicID = require("../get/public-id");
const GetSocketRequestSession = require("./helpers/get-socket-request-session");

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

module.exports = function(io, middlewares){
    const laundryNsp = io.of("/laundry");
    const userNsp = io.of("/user");

    setMiddlewares(laundryNsp, middlewares);
    setMiddlewares(userNsp, middlewares);

    laundryNsp.on("connection", socket =>{

        checkHandshake(socket, "laundry");

    });

    userNsp.on("connection", socket =>{
        checkHandshake(socket, "user");

    });
}

function setMiddlewares(namespace, middlewares){
    middlewares.map(middleware =>{
        namespace.use(wrap(middleware));
    });
}

async function checkHandshake(socket, userRole){
    try{
        const {userType, hashcode} = GetSocketRequestSession(socket);
        const publicID = await GetPublicID(userType, hashcode);
    
        //handshake validation
        if(!publicID) socket.disconnect();
        if(userType !== userRole) socket.disconnect();
    
        //join its own laundry room by its own laundryInitials
        socket.join(publicID);
        
    }catch(err){
        console.log(err);
        socket.disconnect();
    }
}
