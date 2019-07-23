module.exports = {
  configureWebpack: {
  },
  devServer: {
    open: 'Chrome',
    proxy: 'http://localhost:5600',
  },
};
