// const { createProxyMiddleware } = require('http-proxy-middleware');
//
// module.exports = function(app) {
//     app.use(
//         createProxyMiddleware( '/api/roles',{
//             target: 'http://localhost:8090/beta/fintlabs-no',
//             // target: 'http://localhost:8090',
//             changeOrigin: true,
//             headers: {
//                 Connection: "keep-alive"
//             }
//         })
//     );
//
//     app.use(
//         createProxyMiddleware('/api/orgunits', {
//             target: 'http://localhost:8081/beta/fintlabs-no',
//             // target: 'http://localhost:8081',
//             changeOrigin: true,
//             //pathRewrite: {"^/api5": ""},
//             headers: {
//                 Connection: "keep-alive"
//             }
//         })
//     );
//     //
//     // app.use(
//     //     createProxyMiddleware('/api/layout/configuration',{
//     //     // target: 'http://localhost:8080/beta/fintlabs-no',
//     //         target: 'http://localhost:8080',
//     //         changeOrigin: true,
//     //     })
//     // );
//
// };
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

module.exports = function (app) {
    let rolesTarget, orgunitsTarget;
    let basePath = '';

    if (process.env.NODE_ENV === 'production') {
        axios.get('api/layout/configuration')
            .then(response => {
                basePath = response.data.basePath;
                console.log("Setting a basepath:", basePath);

                rolesTarget = `http://localhost:8090${basePath}`;
                orgunitsTarget = `http://localhost:8081${basePath}`;
            })
            .catch(error => {
                console.error('Failed to get basePath:', error);
            });
    } else {
        rolesTarget = 'http://localhost:8090/beta/fintlabs-no';
        orgunitsTarget = 'http://localhost:8081/beta/fintlabs-no';
    }

    app.use(
        createProxyMiddleware('/api/roles', {
            target: rolesTarget,
            changeOrigin: true,
            headers: {
                Connection: 'keep-alive',
            },
        })
    );

    app.use(
        createProxyMiddleware('/api/orgunits', {
            target: orgunitsTarget,
            changeOrigin: true,
            headers: {
                Connection: 'keep-alive',
            },
        })
    );
};

