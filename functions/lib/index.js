import { onRequest } from "firebase-functions/v2/https";
import next from "next";
import path from "path";
import { fileURLToPath } from "url";
// Soporte __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = next({
    dev: false,
    conf: {
        distDir: path.join(__dirname, "..", ".next"),
    },
});
const handler = app.getRequestHandler();
export const nextServer = onRequest({ timeoutSeconds: 60 }, async (req, res) => {
    await app.prepare();
    handler(req, res);
});
