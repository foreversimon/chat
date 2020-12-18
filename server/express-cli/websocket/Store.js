function Store (prop = {}) {
    this._data = prop
    this._listenCache = {
        'change': []
    }
}

Store.prototype.setData = new Proxy(setData, {
    apply(target, thisArg, argArray) {
        const oldValue = getData.apply(thisArg, argArray)
        Reflect.apply(target, thisArg, argArray)
        thisArg._listenCache.change.forEach(item => item.call(this, ...argArray, oldValue))
    }
})

Store.prototype.getData = getData

Store.prototype.listen = listen

Store.prototype.listenRemove = listenRemove

function setData (key, value) {
    if (!key) {
        this._data = value
        return
    }
    valueChange(this._data, key, value)
}

function getData (key) {
    return (key === undefined ? this._data : valueChange(this._data, key))
}

function listen (key, callback) {
    if (this._listenCache[key]) {
        this._listenCache[key].push(callback)
    }
}

function listenRemove (key, callback) {
    if (this._listenCache[key]) {
        const findIndex = this._listenCache[key].findIndex(item => callback === item)
        if (findIndex >= 0) {
            this._listenCache[key].splice(findIndex, 1)
        }
    }
}

function valueChange (base, key, value) {
    if (key.includes('.')) {
        let arr = key.split('.')
        let target = null
        while (arr.length > 1) {
            target = base[arr[0]]
            arr.shift()
        }
        return target[arr[0]] = (value === undefined ? target[arr[0]] : value)
    } else {
        return base[key] = (value === undefined ? base[key] : value)
    }
}

module.exports = Store
