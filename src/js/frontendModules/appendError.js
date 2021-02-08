module.exports = {
    appendError : (id, message, color) =>{
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
    
        if(!existsDOMMessage(id)){
            let parentElement = document.getElementById(id).parentElement;

            let DOMmessage = document.createElement("span");
            DOMmessage.id = `msg4${id}`;
            DOMmessage.className = `${txtColor}`;
            DOMmessage.textContent = `${message}`;

            parentElement.appendChild(DOMmessage);
        }
    },

    deleteError: (id) => {

        if(existsDOMMessage(id)){
            document.getElementById(`msg4${id}`).remove();
        }
    }
};

function existsDOMMessage(id){
    let DOMMessage = document.getElementById(`msg4${id}`);
    return DOMMessage;
}