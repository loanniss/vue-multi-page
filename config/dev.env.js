'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_PORTAL_PATH: '"http://fancy.linjunzhu.cn:8080"'
})
