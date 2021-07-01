const PATH = require('path')
const WEBPACK = require('webpack')

  module.exports = {
    configureWebpack: {
      plugins: [
        new WEBPACK.optimize.LimitChunkCountPlugin({
            minChunkSize :5,
            maxChunks: 7
          })
      ]
    }
  }