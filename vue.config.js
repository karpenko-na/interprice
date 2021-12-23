module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  filenameHashing: true,
  productionSourceMap: false,

  pages: {
    index: 'src/main.js',
  },

  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/__app.scss";
        `
      }
    }
  }
}