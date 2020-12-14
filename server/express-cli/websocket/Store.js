function Store (prop = {}) {
    this._data = prop
    this._listenCache = {
        'change': []
    }
}

Store.prototype.setData = function (key, value) {
    const changeValue = valueChange(this._data, key, value)
    this._listenCache.change.forEach(item => item.call(this, changeValue, key))
}

Store.prototype.getData = function (key) {
    return (key === undefined ? this._data : valueChange(this._data, key))
}

Store.prototype.listen = function (key, callback) {
    if (this._listenCache[key]) {
        this._listenCache[key].push(callback)
    }
}

Store.prototype.listenRemove = function (key, callback) {
    if (this._listenCache[key]) {
        const findIndex = this._listenCache[key].findIndex(item => callback === item)
        if (findIndex) {
            this._listenCache.splice(findIndex, 1)
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
