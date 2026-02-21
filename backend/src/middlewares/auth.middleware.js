const jwt = require("jsonwebtoken")

function authenticate(request, response, next) {
    let jwtToken 
    const authHeader = request.headers["authorization"]
    if (authHeader) {
        jwtToken = authHeader.split(" ")[1]
    }
    if (jwtToken === undefined) {
        const error = new Error("Invalid JWT Token")
        error.statusCode = 401
        return next(error)
    } else {
        jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, async (error, payload) => {
            if (error) {
                const error = new Error("Invalid JWT Token")
                error.statusCode = 401
                return next(error)
            } else {
                request.user = {
                    id: payload.id,
                    role: payload.role
                }
                next()
            }
        })
    }
}

module.exports = {
    authenticate
}