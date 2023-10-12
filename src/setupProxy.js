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

module.exports = function(app) {
    let rolesTarget, orgunitsTarget;
    let basePath = '';

    if (process.env.NODE_ENV === 'production') {
        rolesTarget = 'http://localhost:8090';
        orgunitsTarget = 'http://localhost:8081';
    } else {
        rolesTarget = 'http://localhost:8090/beta/fintlabs-no';
        orgunitsTarget = 'http://localhost:8081/beta/fintlabs-no';
    }
console.log("roles target", rolesTarget);

    app.get('/api/layout/configuration', (req, res) => {
        basePath = res.data.basePath;
        console.log("setting a basepath?", basePath);
        // res.json({ basePath });
    });

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
