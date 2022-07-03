const colorService = require('./color.service')

async function getColors(req, res) {
    try {
        const colors = await colorService.query()
        res.send(colors)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get colors' })
    }
}

async function updateColor(req, res) {
    try {
        const color = req.body
        color.voteCount++
        const savedColor = await colorService.save(color)
        res.send(savedColor)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update color' })
    }
}

module.exports = {
    getColors,
    updateColor
}