//namespace can be referred as the role



module.exports = {

    emitUpdateOrders: (io, namespace, publicID) =>{
        console.log("updating");
        emitNewCurrentOrderIDIfLaundry(io, namespace, publicID);
        io.of(`/${namespace}`).to(publicID).emit("update-orders");
    },

     emitNotification: (io, getter_role, getter) => {
        //getter = publicID in the context of notifications
        io.of(`/${getter_role}`).to(getter).emit("notification");
    },

    emitNewDateTime: (io) => {
        console.log("emittinadawd");
        io.sockets.emit("new-date-time");
    }
};

function emitNewCurrentOrderIDIfLaundry(io, namespace, laundryInitials){
    if(namespace === "laundry") io.of("/laundry").to(laundryInitials).emit("new-current-order-id");
}