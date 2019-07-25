require('dotenv').config({ silent: true });
const path = require('path');

process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  outputDir: path.resolve(__dirname, '../dist'),
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
