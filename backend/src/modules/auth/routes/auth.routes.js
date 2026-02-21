const express = require("express")

const authController = require("../controller/auth.controller")

const router = express.Router()

router.post("/register", authController.createUser)
router.post("/login", authController.login)

module.exports = router