"use strict";

require.config({
    paths: {
        detailsMessage: "./frontendModules/detailsMessageHandler"
    }
});

define(["detailsMessage"], function(detailsMessage){

    //this function classifies the acceptance and the length
    //of the password inputted. 
    //Also this handles alert messages and returns true if 
    //the inputted password passes the required parameters. 
    //Returns false if it doesn't pass the required parameters
    return function(id,password, messageMode){
        const weakLength = 8;
        const mediumLength = 12;
        const strongLength = 14;
        let actualLength = (password == undefined) ? 0 :password.length;
        let msg = {
          msgWeak: "Contraseña muy débil, inserta una contraseña más fuerte",
          msgNormal: "Contraseña moderada",
          msgStrong: "Contraseña moderadamente fuerte",
          msgVeryStrong: "Contraseña fuerte",
          msgEqualActual: "Debes introducir una nueva contraseña",
          msgEqualNew: "¡Las contraseñas coinciden!",
          msgNotEqualNew: "¡Las contraseñas no coinciden!",
          msgUpdateSuccess: "¡La contraseña fue atualizada con éxito!"
        };
        let accepted = false;
        
        detailsMessage.delete(id);
        switch (true) {
    
          case(messageMode === "new"):
            detailsMessage.append(id, msg.msgEqualActual, "red");
          break;

          case(messageMode === "repeatTrue"):
            detailsMessage.append(id, msg.msgEqualNew, "green");
          break;

          case(messageMode === "repeatFalse"):
            detailsMessage.append(id, msg.msgNotEqualNew, "red");
          break;    

          case(messageMode === "passwordUpdateSuccess"):
            detailsMessage.append(id, msg.msgUpdateSuccess, "green");
          break;  

          case (actualLength < weakLength):
              detailsMessage.append(id, msg.msgWeak, "red");
              //formVerification(id, false);
              accepted = false;
          break;
        
          case ((actualLength >= weakLength) && (actualLength <= mediumLength)):
              detailsMessage.append(id, msg.msgNormal, "yellow");
              //formVerification(id, true);
              accepted = true;
          break;
    
          case ((actualLength > mediumLength) && (actualLength <= strongLength)):
              detailsMessage.append(id, msg.msgStrong, "yellowGreen");
              //formVerification(id, true);
              accepted = true;
          break;
    
          case (actualLength > strongLength):
              detailsMessage.append(id, msg.msgVeryStrong, "green");
              //formVerification(id, true);
              accepted = true;
          break;
        }
        return accepted;
    }

});