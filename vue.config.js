const path = require('path')
const port = process.env.port || process.env.npm_config_port || 9528 // dev port
const name = ''

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  // TODO: Remember to change publicPath to fit your need
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  pwa: {
    name: name
  },
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: false,
    proxy: {
      '/mock-api/v1': {
        target: 'http://localhost:9528', // 设置调用的接口域名和端口
        changeOrigin: true, // 是否跨域
        ws: true,
        pathRewrite: {
          '^/mock-api/v1': '/mock-api/v1'
        }
      }
    }
    // before: require('./mock/mock-server.js')
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // provide the app's title in html-webpack-plugin's options list so that
    // it can be accessed in index.html to inject the correct title.
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    config.plugin('html').tap(args => {
      args[0].title = name
      return args
    })
  }
  // devServer: {
  //   port: 8080,
  //   open: false,
  //   overlay: {
  //     warnings: false,
  //     errors: true
  //   },
  //   disableHostCheck: false,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:9528', // 设置调用的接口域名和端口
  //       changeOrigin: true, // 是否跨域
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  //   // before: require('./mock/mock-server.js')
  // }
}
