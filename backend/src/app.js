const express = require("express")
const cors = require("cors")

const authRoutes = require("./modules/auth/routes/auth.routes")
const notesRoutes = require("./modules/notes/routes/notes.routes")

const errorHandler = require("./middlewares/errorHandler")
const authMiddleware = require("./middlewares/auth.middleware")

const app = express()
app.use(express.json())

app.use(cors())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/notes", authMiddleware.authenticate, notesRoutes)

app.use(errorHandler)

module.exports = app