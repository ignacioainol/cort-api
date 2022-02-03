const { createUser, getAllEscorts, getAll, loginUser, getUserById, changePassword } = require('../models/User');
const { getToken, emailRegistered } = require('../utils');
const generator = require('generate-password');


const create = async (req, res) => {

    const password = generator.generate({
        length: 10,
        numbers: true
    });

    try {
        req.body.password = password;
        const newUser = await createUser(req.body);
        emailRegistered({ nickname: req.body.nickname, email: req.body.email, password: req.body.password });
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

    if (password === '' || newPassword === '' || confirmNewPassword === '') {
        res.status(400).send({ message: "Todos los campos son requeridos." });
    } else {
        try {
            const user = await getUserById(user_id);
            if (user.password === password) {
                if (newPassword === confirmNewPassword) {
                    const updatedPassword = await changePassword(user_id, newPassword);
                    res.status(200).send(updatedPassword);
                } else {
                    res.status(400).send({ message: "La nueva contraseña no coinciden con la verificación." });
                }
            } else {
                res.status(401).send({ message: "La contraseña no coincide con su contraseña actual" });
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

}

module.exports = {
    create,
    getAllUsers,
    getEscorts,
    signin,
    updatePassword
}