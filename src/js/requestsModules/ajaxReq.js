const axios = require("axios");

async function get(url, data){
    return await axios.get(url, {params: data});
}

async function post(url,data){
    return await axios.post(url, data);
}
 
async function put(url, data){
    return await axios.put(url, data);
}

async function deleteQ(url, data){ //delete is reserved
    console.log(data);
    return await axios.delete(url, {data: data});
}

module.exports = {
    get: get,
    post: post,
    put: put,
    delete: deleteQ
};

