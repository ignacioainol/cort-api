// import User from '../models/User';
const { createUser } = require('../models/User');


const create = async (req, res) => {
    try {
        res.send(createUser(req.body));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create
}