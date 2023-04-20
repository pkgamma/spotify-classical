// const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// const app = express();

// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "https://api.concertmaster.app",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/api": "", // Remove the /api prefix from the path
//     },
//   })
// );

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });
