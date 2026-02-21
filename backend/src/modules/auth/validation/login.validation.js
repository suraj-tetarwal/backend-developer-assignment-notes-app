function validateLoginData(data) {
    const {email, password} = data

    if (!email || !password) {
        const error = new Error("Email and password are required")
        error.statusCode = 400
        throw error
    }

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail || !trimmedPassword) {
        const error = new Error("Email and password must be valid")
        error.statusCode = 400
        throw error
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(trimmedEmail)) {
        const error = new Error("Invalid email format")
        error.statusCode = 400
        throw error
    }

    return {
        email: trimmedEmail,
        password: trimmedPassword
    }
}

module.exports = validateLoginData