const express = require('express')
const cors = require('cors')
const path = require('path')

const colorService = require('./services/color.service')
const { setupSocketAPI } = require('./services/socket.service')

const app = express()
const http = require('http').createServer(app)


app.use(express.json())
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


app.get('/api/color', async (req, res) => {
    try {
        const colors = await colorService.query()
        res.send(colors)
    } catch (err) {
        throw err
    }
})

app.put('/api/color', async (req, res) => {
    try {
        const color = req.body
        color.voteCount++
        const savedColor = await colorService.save(color)
        res.send(savedColor)
    } catch (err) {
        throw err
    }
})

setupSocketAPI(http)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030
http.listen(port)