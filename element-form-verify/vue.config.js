module.exports = {
  chainWebpack: config => {
    config.set('externals', {
      'vue': 'Vue',
      'element-ui': 'element-ui'
    })
  }
}