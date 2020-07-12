require.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }
});

define(["jquery", "formVerification"], function($, formVerification){

    function passwordCategorization(id, text){
        //function to verify, announce passwords criteria on input
        const weakLength = 6;
        const mediumLength = 10;
        const strongLength = 14;
        const actualLength = text.length;

        const msg = {
        msg1: "Contraseña muy débil, inserta una contraseña más fuerte",
        msg2: "Contraseña moderada",
        msg3: "Contraseña moderadamente fuerte",
        msg4: "Contraseña fuerte"
        };

        formVerification.deleteAppendError(id);

        switch (true) {
            case (actualLength < weakLength):
                formVerification.formAppendError(id, msg.msg1, "red");
                formVerification.invokeVerify(id, false);
            break;
        
            case ((actualLength >= weakLength) && (actualLength <= mediumLength)):
                formVerification.formAppendError(id, msg.msg2, "yellow");
                formVerification.invokeVerify(id, true);
            break;

            case ((actualLength > mediumLength) && (actualLength <= strongLength)):
                formVerification.formAppendError(id, msg.msg3, "yellowGreen");
                formVerification.invokeVerify(id, true);
            break;

            case (actualLength > strongLength):
                formVerification.formAppendError(id, msg.msg4, "green");
                formVerification.invokeVerify(id, true);
            break;
        }
    }

    function rePasswordVerify(id, inputPassword, inputRepassword){
        //function to check if passwords are the same
        const msg = {
        msg1: "¡Las contraseñas no coinciden!",
        msg2: "¡Las contraseñas coinciden!"
        };

        formVerification.deleteAppendError(id);
        if(inputRepassword !== inputPassword){
            formVerification.formAppendError(id, msg.msg1, "red");
            formVerification.invokeVerify(id, false);
        }else{
            formVerification.formAppendError(id, msg.msg2, "green");
            formVerification.invokeVerify(id, true);
        }
    }

    return{
        passwordCategorization: passwordCategorization,
        rePasswordVerify: rePasswordVerify
    };

});