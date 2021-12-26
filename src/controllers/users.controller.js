// import User from '../models/User';
const { createUser } = require('../models/User');


const create = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        console.log("llego");
        res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create
}