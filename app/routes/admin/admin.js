const express = require('express')
const router = express.Router()

const admin_controller = require('../../controllers/admin/admin')

router.post('/getadmin', admin_controller.getadmin)
router.post('/check_auth', admin_controller.check_auth)
router.post('/login', admin_controller.login)
router.post('/new_Password', admin_controller.new_Password)

module.exports = router