function validateCreateUserData(data) {
    const {name, email, password} = data

    if (!name || !email || !password) {
        const error = new Error("All fields are required")
        error.statusCode = 400
        throw error
    }

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        const error = new Error("All fields must be valid")
        error.statusCode = 400
        throw error
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(trimmedEmail)) {
        const error = new Error("Invalid email format")
        error.statusCode = 400
        throw error
    }

    if (trimmedPassword.length < 6) {
        const error = new Error("Password must be atleast 6 characters")
        error.statusCode = 400
        throw error
    }

    return {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword
    }

}

module.exports = validateCreateUserData