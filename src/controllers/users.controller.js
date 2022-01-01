const { createUser, getAllEscorts, getAll } = require('../models/User');


const create = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const data = await getAll();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}

const getEscorts = async (req, res) => {
    try {
        const data = await getAllEscorts();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create,
    getAllUsers,
    getEscorts
}