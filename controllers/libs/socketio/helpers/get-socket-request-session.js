module.exports = function(socket){
    try{
        return socket.request.session; //default
    }catch(err){
        return socket.req.session;
    }
}