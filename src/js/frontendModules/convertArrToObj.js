
module.exports = function(arr) { 
    /* Get an array of objects and converts it to pure objects
    It should have a property unique id, since that will 
    be the reference to the output obj keys. */
    let obj = {};
    arr.map(element =>{
        obj = Object.assign(obj, {[element.id] : element});
    })
    return obj;
}