const { createUser, getAllEscorts, getAll, loginUser, getUserById } = require('../models/User');
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
            res.status(401).send({ message: 'Email o Password Incorrecto.' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updatePassword = async (req, res) => {
    const { user_id, password, newPassword, confirmNewPassword } = req.body;
    try {
        const user = await getUserById(user_id);
        if (user.password === password) {
            if (newPassword === confirmNewPassword) {
                res.send("wena xoro, se cambiara pa password")
            } else {
                res.status(400).send({ msg: "Las contraseñas no coinciden" });
            }
        } else {
            res.status(401).send({ msg: "La contraseña no coincide con su contraseña actual" });
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    create,
    getAllUsers,
    getEscorts,
    signin,
    updatePassword
}