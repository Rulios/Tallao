"use strict";

const detailsMessage = require("./detailsMessageHandler");
const {getStaticText} = require("../../../translation/frontend/translator");

//this function classifies the acceptance and the length
//of the password inputted. 

//Also this handles alert messages and returns true if 
//the inputted password passes the required parameters. 
//Returns false if it doesn't pass the required parameters

module.exports = function(id,password, messageMode){
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
      detailsMessage.append(id, getStaticText("needToIntroduceNewPassword"), "red");
    break;

    case(messageMode === "repeatTrue"):
      detailsMessage.append(id, getStaticText("passwordMatch"), "green");
    break;

    case(messageMode === "repeatFalse"):
      detailsMessage.append(id, getStaticText("passwordDoesntMatch"), "red");
    break;    

    case(messageMode === "passwordUpdateSuccess"):
      detailsMessage.append(id, getStaticText("passwordChange_success"), "green");
    break;  

    case (actualLength < weakLength):
        detailsMessage.append(id, getStaticText("weak_passwordLength"), "red");
        //formVerification(id, false);
        accepted = false;
    break;
  
    case ((actualLength >= weakLength) && (actualLength <= mediumLength)):
        detailsMessage.append(id, getStaticText("moderate_passwordLength"), "yellow");
        //formVerification(id, true);
        accepted = true;
    break;

    case ((actualLength > mediumLength) && (actualLength <= strongLength)):
        detailsMessage.append(id, getStaticText("moderateStrong_passwordLength"), "yellowGreen");
        //formVerification(id, true);
        accepted = true;
    break;

    case (actualLength > strongLength):
        detailsMessage.append(id, getStaticText("strong_passwordLength"), "green");
        //formVerification(id, true);
        accepted = true;
    break;
  }
  return accepted;
}
