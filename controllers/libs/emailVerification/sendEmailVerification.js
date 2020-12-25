const sgMail = require("@sendgrid/mail");

module.exports = async function(host, email, token){
    
    const LINK = `${host}/emailVerification/${token}`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const MESSAGE = {
        to: email,
        from: process.env.SENDGRID_SENDER,
        subject: "¡Bienvenido a Talla'o! Confirma tu correo electrónico",
        text: "Confirma tu correo para disfrutar Talla'o",
        html: `
            <div>

                <h1>Antes de disfrutar Talla'o, debes confirmar tu cuenta</h1>
                <br>
                <br>
                <div>
                    Confirma tu cuenta clicando a este enlace:
                    <a href="http://${LINK}">http://${LINK}</a>
                </div>
            </div>

            
        `
    };

    await sgMail.send(MESSAGE);
}

