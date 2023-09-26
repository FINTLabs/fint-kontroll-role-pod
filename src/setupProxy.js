const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware( '/api/roles',{
            // target: 'http://localhost:8061/beta/fintlabs-no',
            target: 'http://localhost:8090',
            changeOrigin: true,
        })
    );

    app.use(
        createProxyMiddleware('/api/orgunits', {
            // target: 'http://localhost:8060/beta/fintlabs-no',
            target: 'http://localhost:8081',
            changeOrigin: true,
            //pathRewrite: {"^/api5": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );

    app.use(
        createProxyMiddleware('/api/layout/configuration',{
        // target: 'http://localhost:8080/beta/fintlabs-no',
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );

};
