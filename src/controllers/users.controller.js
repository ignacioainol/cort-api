// import User from '../models/User';
const User = require('../models/User');

// export async function createUser(req, res) {
//     try {
//         // const { name, lastname, username } = body;
//         res.send('llego al controller users');
//     } catch (error) {
//         console.log(error);
//     }
// }

const createUser = async (req, res) => {
    try {
        res.send("llego al controller de user");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createUser
}