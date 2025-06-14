const { https } = require("firebase-functions");
const { default: next } = require("next");
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

const server = next({
  dev: isDev,
  // La carpeta .next está un nivel arriba de la carpeta /functions
  conf: { distDir: path.join("..", ".next") },
});

const nextjsHandle = server.getRequestHandler();

exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});