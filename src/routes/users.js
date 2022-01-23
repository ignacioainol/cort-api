const express = require('express');
const router = express.Router();
const { create, getAllUsers, getEscorts, signin } = require('../controllers/users.controller');

router.get('/', getAllUsers);
router.post('/escorts', create);
router.get('/escorts', getEscorts);
router.post('/signin', signin)


module.exports = router;
