const express = require('express')
const empController = require('./../controllers/empController')
const authController = require('./../controllers/authController')

const router = express.Router()


router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/').get(authController.protect, empController.getEmp)
    .post(empController.createEmp)

module.exports = router