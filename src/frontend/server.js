const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev.config')

const host = '0.0.0.0'
const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'development'

// 代理服务
let proxy = {
  '/api/*': {
    target: {
      'host': 'fg.redbon.cn',
      'protocol': 'http:',
      'port': 80
    },
    ignorePath: false,
    changeOrigin: true,
    secure: false
  }
}

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  disableHostCheck: true,
  historyApiFallback: true,
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  },
  host,
  proxy
}).listen(port, host, function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎 Listening on port %d in %s mode', port, env)
})