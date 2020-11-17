"use strict";

//this file handles the detail message (small text used to drive the user)
function append(id, message,color){

    let txtColor = "";
    switch (color) {
        case "red":
            txtColor = "redTxt";
        break;

        case "yellow":
            txtColor = "yellowTxt";
        break;

        case "yellowGreen":
            txtColor = "yellowGreenTxt";
        break;
    
        case "green":
            txtColor = "greenTxt";
        break;
    
    }

    const detailMessage = document.createElement("span");
    detailMessage.setAttribute("id", `msg4${id}`);
    detailMessage.setAttribute("class", txtColor);
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