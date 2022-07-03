var gIo = null

function setupSocketAPI(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        socket.on('disconnect', socket => {
            console.log(`Socket disconnected [id: ${socket.id}]`)
        })
        socket.on('click-vote', color => {
            console.log(`New vote from socket [id: ${socket.id}]`)
            gIo.emit('add-vote', color)
        })
    })
}

module.exports = {
    setupSocketAPI
}