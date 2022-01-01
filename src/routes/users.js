const express = require('express');
const router = express.Router();
const { create, getAllUsers, getEscorts } = require('../controllers/users.controller');

router.post('/create', create);
router.get('/', getAllUsers);
router.get('/escorts', getEscorts);


module.exports = router;
