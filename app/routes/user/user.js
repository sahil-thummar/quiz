const express = require('express');
const router = express.Router();
const user_controller = require('../../controllers/user/user');

router.post('/login', user_controller.login);

module.exports = router;