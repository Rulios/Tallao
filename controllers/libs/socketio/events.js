function emitUpdateOrders(io, namespace, publicID){
    io.of(`/${namespace}`).to(publicID).emit("update-orders");
}

module.exports = {
    emitUpdateOrders: emitUpdateOrders
};