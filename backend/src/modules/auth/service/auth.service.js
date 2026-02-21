const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../../../models/user.model")

async function createUser(data) {
    const {name, email, password} = data

    const normalizedEmail = email.toLowerCase().trim()

    const existingUser = await User.findOne({where: {email: normalizedEmail}})

    if (existingUser) {
        const error = new Error("Email already exists")
        error.statusCode = 400
        throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: "USER"
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
}

async function login(data) {
    const {email, password} = data

    const normalizedEmail = email.toLowerCase().trim()

    const existingUser = await User.findOne({where: {email: normalizedEmail}})

    if (!existingUser) {
        const error = new Error("Invalid credentials")
        error.statusCode = 401
        throw error
    }

    const isPasswordMatched = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordMatched) {
        const error = new Error("Invalid credentials")
        error.statusCode = 401
        throw error
    }

    const jwtPayload = {
        id: existingUser.id,
        role: existingUser.role
    }
    const token = jwt.sign(
        jwtPayload, 
        process.env.JWT_SECRET_KEY, 
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )

    return {
        token,
        user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        }
    }
}

module.exports = {
    createUser,
    login
}