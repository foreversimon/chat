const Ws = require('ws')
const Store = require('./Store')

// ws全局变量

global.wsStore = new Store()

function createWs (server) {
    const wss = new Ws.Server({server, path: '/ws'})
    wss.on('connection', function (ws) {
        wsStore.listen('change', function (val, key) {
            ws.send(JSON.stringify(wsStore.getData()))
        })
        ws.on('message', onMessage)
    })
}

function onMessage (msg) {
}

module.exports = createWs;
