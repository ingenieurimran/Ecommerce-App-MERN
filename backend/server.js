const app = require('./app')
const cloudinary = require('cloudinary')
const connectDatabse = require('./config/database')

// Uncaught Exception Handling
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to Uncaught Exception`)
  process.exit(1)
})

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
// Connecting to database
connectDatabse()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://loccalhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to Unhandled Promise Rejection`)

  server.close(() => {
    process.exit(1)
  })
})
