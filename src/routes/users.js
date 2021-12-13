const express = require('express');
const router = express.Router();
const userModel = require('../models/User');
const { create } = require('../controllers/users.controller');

router.post('/create', create);

router.get('/', async (req, res) => {
    try {
        const users = await userModel.getAll();

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
