module.exports = {
  configureWebpack: {
  },
  devServer: {
    open: 'Chrome',
    proxy: {
      '/api': {
        target: 'https://localhost:5600',
        secure: false,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/scss/_colors.scss";',
      },
    },
  },
};
