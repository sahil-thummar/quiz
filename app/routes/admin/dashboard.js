const express = require('express');
const router = express.Router();
const result_controller = require('../../controllers/admin/dashboard');

router.post('/getresult', result_controller.getresult);

module.exports = router;