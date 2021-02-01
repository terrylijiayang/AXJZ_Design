'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IMAGE_PATH:'http://127.0.0.1:8080/images/'
  // IMAGE_PATH:'E://我的大四//毕业设计//csgl//images/'
})
