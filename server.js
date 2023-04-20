// const express = require("express");
// const next = require("next");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const apiProxy = createProxyMiddleware("/cmapi", {
//   target: "https://api.concertmaster.app",
//   changeOrigin: true,
//   pathRewrite: {
//     "^/cmapi": "/",
//   },
// });

// app.prepare().then(() => {
//   const server = express();

//   // Proxy API requests to the external API
//   server.use("/cmapi", apiProxy);

//   server.all("*", (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log("> Ready on http://localhost:3000");
//   });
// });
