module.exports = {
  lintOnSave: false,
    configureWebpack: {
      resolve:{
        alias:{
          '@': __dirname + '/src'
        }
      },
      watch: true
    }
  }