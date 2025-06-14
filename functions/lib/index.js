import { onRequest } from "firebase-functions/v2/https";
import next from "next";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
export const nextServer = onRequest({ timeoutSeconds: 60 }, async (req, res) => {
    await app.prepare();
    handle(req, res);
});
