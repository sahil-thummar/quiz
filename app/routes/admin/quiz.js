const express = require('express');
const router = express.Router();
const quiz_controller = require('../../controllers/admin/quiz')

router.post("/addquiz", quiz_controller.addquiz)
router.post('/getquizs', quiz_controller.getquizs)

module.exports = router