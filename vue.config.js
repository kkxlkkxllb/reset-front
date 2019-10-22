module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://eradai.com', // 接口的域名
        ws: false,
        secure: false, // 如果是https接口，需要配置这个参数
        logLevel: 'debug',
        changeOrigin: true
      }
    }
  }
}
