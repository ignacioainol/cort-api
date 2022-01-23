require('dotenv').config();
const jwt = require('jsonwebtoken');


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

module.exports = {
    getToken
}