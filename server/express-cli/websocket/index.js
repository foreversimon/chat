const Ws = require('ws')
const Store = require('./Store')

// ws全局变量

global.wsStore = new Store({
    userList: []
})

function createWs (server) {
    const wss = new Ws.Server({server, path: '/ws'})
    wss.on('connection', function (ws) {
        const handleChange = onChangeData.bind(undefined)
        wsStore.listen('change', handleChange)
        ws.on('message', onMessage(ws))
        ws.on('close', onClose(ws, handleChange))
    })
}

function onChangeData (key, value, oldValue) {
    console.log('onChange', key, value, oldValue)
}

function onMessage (ws) {
    return function (msg) {
        wsStore.setData('msg', msg)
    }
}

function onClose (ws, listenCallback) {
    return function () {
        console.log('close')
        wsStore.listenRemove('change', listenCallback)
    }
}

module.exports = createWs;
