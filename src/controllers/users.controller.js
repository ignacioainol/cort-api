const { createUser, getAllEscorts, getAll, loginUser } = require('../models/User');
const { getToken } = require('../utils');


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

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const signinUser = await loginUser(email, password);

        if (signinUser) {
            const { user_id, nickname, role_id, first_login } = signinUser;
            res.send({
                user_id,
                nickname,
                role_id,
                first_login,
                token: getToken(signinUser)
            });
        } else {
            res.status(401).send({ msg: 'Invalid Email or Password' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    create,
    getAllUsers,
    getEscorts,
    signin
}