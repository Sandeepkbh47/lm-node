const express = require('express')
const cors = require('cors')
const app = express()
const empRouter = require('./routers/empRouter')

const corsConfig = {
    origin: "*",
    optionSuccessStatus: 200
}

app.use(cors(corsConfig))
app.use(express.json())
app.use('/api/v1/emp', empRouter)
app.use(express.static('./dist'))
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        err: err.message
    })
})
module.exports = app