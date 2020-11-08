const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/api"],
        createProxyMiddleware({
            target: "http://localhost:3030" || `http://localhost:${process.env.PORT}` || `http://0.0.0.0:${process.env.PORT}` ,
            changeOrigin: true 
        })
    );
};

