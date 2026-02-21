const validateCreateUserData = require("../validation/register.validation")
const validateLoginData = require("../validation/login.validation")

const authService = require("../service/auth.service")

async function createUser(request, response, next) {
    try {
        const data = validateCreateUserData(request.body)
        
        const user = await authService.createUser(data)

        response.status(201).json(user)
    } catch(error) {
        next(error)
    }
}

async function login(request, response, next) {
    try {
        const data = validateLoginData(request.body)

        const result = await authService.login(data)

        response.status(200).json({
            message: "Login successful",
            ...result
        })
    } catch(error) {
        next(error)
    }
}

module.exports = {
    createUser,
    login
}