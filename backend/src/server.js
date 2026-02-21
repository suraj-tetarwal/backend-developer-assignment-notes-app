require("dotenv").config({quiet: true})

const app = require("./app")
const sequelize = require("./config/database")

async function startServerAndDB() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.log(`DB Error: ${error.message}`)
        process.exit(1)
    }
}

startServerAndDB()