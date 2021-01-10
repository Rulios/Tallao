"use strict";

//this file handles the detail message (small text used to drive the user)
function append(id, message,color){

    const TXT_COLOR = `${color}Txt`;

    const detailMessage = document.createElement("span");

    detailMessage.setAttribute("id", `msg4${id}`);
    detailMessage.setAttribute("class", TXT_COLOR);
    detailMessage.textContent = message;

    if(document.getElementById(id) !== null){
        document.getElementById(id).parentNode.appendChild(detailMessage);
    }

}

function deleteMessage(id){
    if(document.getElementById(`msg4${id}`) !== null){
        document.getElementById(`msg4${id}`).remove();
    }
}

module.exports = {
    append: append,
    delete: deleteMessage
};