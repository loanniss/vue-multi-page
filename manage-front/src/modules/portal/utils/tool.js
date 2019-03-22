let class2type = {}
'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (e, i) {
  class2type[ '[object ' + e + ']' ] = e.toLowerCase()
})

export default {
  _typeof: function (obj) {
    if (obj == null) {
      return String(obj)
    }
    return typeof obj === 'object' || typeof obj === 'function' ? class2type[ class2type.toString.call(obj) ] || 'object' : typeof obj
  },
  checkNullObj: function (obj) {
    return (obj === null || obj === undefined) ? true : Object.keys(obj).length === 0
  },
  camelize: function (str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase()
  },
  camelizeObj: function (obj) {
    var keys = Object.keys(obj)
    for (var j = 0; j < keys.length; j++) {
      var camelizeKey = keys[j].replace(/([A-Z])/g, '_$1').toLowerCase()
      if (camelizeKey !== keys[j]) {
        obj[camelizeKey] = obj[keys[j]]
        delete obj[keys[j]]
      }
    }
    return obj
  }
}
