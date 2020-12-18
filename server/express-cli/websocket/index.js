const Ws = require('ws')
const Store = require('@foreversimon/my-store')
const MongoClient = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost:27017/'

const path = '/ws'

// ws全局变量
global.wsStore = new Store({
    allWs: {}
})

function createWs (server) {
    const wss = new Ws.Server({server, path})
    wss.on('connection', function (ws, req, next) {
        const handleChangeWs = onChangeWs()
        const listenArr = [
            [wsStore, handleChangeWs, 'change']
        ]
        registerListener(listenArr)
        onConnection(ws, req.cookies)
        ws.on('message', onMessage(req.cookies.username))
        ws.on('error', onError(ws, req.cookies, listenArr))
        ws.on('close', onClose(ws, req.cookies, listenArr))
    })
}

function registerListener (arr = []) {
    arr.forEach(item => {
        item[0].$listen(item[2], item[1])
    })
}

function removeListener (arr = []) {
    arr.forEach(item => {
        item[0].$listenRemove(item[2], item[1])
    })
}

function onChangeWs () {
    return function (value, oldValue, target, key) {
        if (key === 'allWs') {
            const objKeys = Object.keys(this.$data.allWs)
            for (let key of objKeys) {
                const item = this.$data.allWs[key]
                const list = objKeys.reduce((base, val) => {
                    return base.concat([{
                        username: item.username
                    }])
                }, [])
                item.ws.send(JSON.stringify({
                    type: 'list',
                    list
                }))
            }
        }
    }
}

function onConnection (ws, cookies) {
    addWs(ws, cookies)
}

function onMessage (username) {
    return function (msg) {
        try {
            const msgJSON = JSON.parse(msg)
            switch (msgJSON.type) {
                case 'message':
                    dispatchMsg({username, msg: msgJSON.msg})
                    break
                case 'clear':
                    wsStore.$data.allWs[username].$data.records = []
                    break
            }
        } catch (e) {
            console.log('非JSON格式')
        }
    }
}

function onError (ws, cookies, removeCallback = []) {
    return function () {
        delWs(cookies.username)
        removeListener(removeCallback)
    }
}

function onClose (ws, cookies, removeCallback = []) {
    return function () {
        delWs(cookies.username)
        removeListener(removeCallback)
    }
}

function dispatchMsg (msg = {username: '', msg: ''}) {
    const objKeys = Object.keys(wsStore.$data.allWs)
    for (let key of objKeys) {
        const item = wsStore.$data.allWs[key]
        item.$data.records = [...item.records, msg]
    }
}

function addWs (ws, {username, password}) {
    wsStore.$data.allWs = {
        ...wsStore.$data.allWs,
        [username]: new Store({
            username,
            password,
            records: [],
            ws
        })
    }
    registerListener([
        [wsStore.$data.allWs[username], handleChangeRecords, 'change']
    ])
    dispatchMsg({username, msg: '已连接'})
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            console.log(err)
            return false
        }
        const dbo = db.db('users')
        dbo.collation('list').find({username}).toArray(function (err, result) {
            if (err) throw err;
            if (result[0].msgBox) {
                wsStore.$data.allWs[username].$data.records = result[0].msgBox
            }
            db.close();
        })
    })

}

function handleChangeRecords (value, oldValue, target, key) {
    if (key === 'records') {
        this.$data.ws.send(JSON.stringify({
            type: 'msg',
            username: this.$data.username,
            msgBox: value
        }))
    }
}

function delWs (username) {
    dispatchMsg({username, msg: '已失去连接'})
    delete wsStore.$data[username]
}

module.exports = createWs;
