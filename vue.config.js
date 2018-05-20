module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  pwa: {
    themeColor: '#3F51B5',
  },
  outputDir: 'dist/public',
  productionSourceMap: false,
};
