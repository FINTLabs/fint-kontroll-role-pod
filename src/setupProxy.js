const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/role',
        createProxyMiddleware({
            target: 'http://localhost:8090',
            changeOrigin: true,
            // Add a console.log statement to debug this proxy route
            onProxyReq: () => {
                console.log('Proxying request to /api/role');
            },
        })
    );

    // app.use(
    //     '/api/member',
    //     createProxyMiddleware({
    //         target: 'http://localhost:8090',
    //         changeOrigin: true,
    //         // You can also add console.log here if needed
    //     })
    // );

    app.use(
        '/api/orgunits',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
            // Add a console.log statement to debug this proxy route
            onProxyReq: () => {
                console.log('Proxying request to /api/orgunits');
            },
        })
    );

    app.use(
        '/api/layout/configuration',
        createProxyMiddleware({
            //target: 'http://localhost:8080/beta/fintlabs-no',
            target: 'http://localhost:8080',
            changeOrigin: true,
            // Add a console.log statement to debug this proxy route
            onProxyReq: () => {
                console.log('Proxying request to /api/layout/configuration');
            },
        })
    );
};
