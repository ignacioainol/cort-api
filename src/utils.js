require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const getToken = (user) => {
    const { user_id, nickname, email, role_id } = user;
    return jwt.sign({
        _id: user_id,
        nickname,
        email,
        role_id
    }, process.env.JWT_SECRET, {
        expiresIn: '48h'
    })
}

const emailRegistered = async (infoNewUser) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'noreply.dev66@gmail.com', // generated ethereal user
            pass: 'testriqra', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Noreply 👻" <bot@register.com>', // sender address
        to: infoNewUser.email, // list of receivers
        subject: "Welcome ✔", // Subject line
        text: `Welcome to Riqra ${infoNewUser.nickname} :D`, // plain text body
        html: `<b>Welcome to Riqra ${infoNewUser.nickname} :D</b>
               <p>Ingrese con su email y su password es ${infoNewUser.password}</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = {
    getToken,
    emailRegistered
}