const createProxyMiddleware  = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:8000/api/v1',
      changeOrigin: true,
    })
  );
};
