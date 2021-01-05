//namespace can be referred as the role

function emitUpdateOrders(io, namespace, publicID){
    io.of(`/${namespace}`).to(publicID).emit("update-orders");
}

function emitNotification(io, getter_role, getter){
    //getter = publicID in the context of notifications
    io.of(`/${getter_role}`).to(getter).emit("notification");
}

module.exports = {
    emitUpdateOrders: emitUpdateOrders,
    emitNotification: emitNotification
};