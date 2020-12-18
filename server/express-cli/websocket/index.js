const Ws = require('ws')
const Store = require('./Store')
const Rx = require('rxjs/Rx')

let observable = new Rx.Subject()
observable.subscribe(value => console.log(value))
observable.next({
    a: '234'
})

// ws全局变量

/**
 * admin: {
        username: '',
        ws: null
    }
 */
global.wsStore = new Store({})
/**
 * admin: {
        ws: null,
        msgBox: [
            {username: 'admin', msg: 'init'}
        ]
    }
 */
global.records = new Store({})

function createWs (server) {
    const wss = new Ws.Server({server, path: '/ws'})
    wss.on('connection', function (ws, req, next) {
        const records = new Store({})
        const handleChangeWs = onChangeWs(ws, req.cookies)
        const handleChangeRecords = onChangeRecords(ws, req.cookies)
        const listenArr = [
            [wsStore, handleChangeWs, 'change'],
            [records, handleChangeRecords, 'change']
        ]
        registerListener(listenArr)
        onConnection(ws, req.cookies)
        ws.on('message', onMessage(ws, req.cookies))
        ws.on('error', onError(ws, req.cookies, listenArr))
        ws.on('close', onClose(ws, req.cookies, listenArr))
    })
}

function registerListener (arr = []) {
    arr.forEach(item => {
        item[0].listen(item[2], item[1])
    })
}

function removeListener (arr = []) {
    arr.forEach(item => {
        item[0].listenRemove(item[2], item[1])
    })
}

function onChangeWs (ws, cookies) {
    return function (key, value, oldValue) {
        if (value === oldValue) return
        // console.log(key, value, oldValue)
    }
}

function onChangeRecords (ws, cookies) {
    return function (key, value, oldValue) {
        if (value === oldValue) return
        // console.log(key, value, oldValue)
    }
}
const dateNow = Date.now() + ''
function onConnection (ws, cookies) {
    wsStore.setData(dateNow, {
        username: 'admin',
        ws
    })
    records.setData(dateNow, {
        msgBox: [],
        ws
    })
}

function onMessage (ws, cookies) {
    return function (msg) {
        const recordsData = records.getData()

        records.setData('', Object.keys(recordsData).reduce((now, value) => {
            const msgBox = recordsData[value].msgBox ? recordsData[value].msgBox.concat([{
                msg,
                username: '',
                date: Date.now()
            }]) : []
            now[value] = {
                ...recordsData[value],
                msgBox: msgBox
            }
            return now[value]
        }, {}))
    }
}

function onError (ws, cookies, removeCallback = []) {
    return function () {
        removeListener(removeCallback)
    }
}

function onClose (ws, cookies, removeCallback = []) {
    return function () {
        removeListener(removeCallback)
    }
}

module.exports = createWs;
