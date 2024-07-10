const socket = require('socket.io')
const app = require('./app')
const httpServer = require('http').createServer(app)
const fs = require('node:fs')
const io = socket(httpServer, { cors: { origin: "*" } })

const socketStream = fs.createWriteStream('socketlog.txt', { flags: "a+" })
io.on("connection", (socket) => {
    app.set('socket', socket)
    console.log("User Connected")
    socket.on('message', (msg) => {
        console.log(msg)
        socketStream.write(msg + "\n")
    })
})


module.exports = httpServer