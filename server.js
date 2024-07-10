const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const httpServer = require('./socker-server')
const redisClient = require('./redis-server')

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Connected to Database")
}).catch(err => {
    process.exit(1)
})
redisClient.connect()
const server = httpServer.listen(process.env.PORT, '0.0.0.0', (err) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log(`listening on ${process.env.PORT}`)
})

process.on('unhandledRejection', (err) => {
    console.log(err)
    server.close(() => {
        process.exit(1)
    })
})


