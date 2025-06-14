// functions/src/index.ts

import { onRequest } from "firebase-functions/v2/https";
import next from "next";
import path from "path";

const app = next({
  dev: false,
  conf: {
    // ⚠️ IMPORTANTE: apúntalo al build standalone
    distDir: path.join("..", ".next"),
  },
});

const handler = app.getRequestHandler();

export const nextServer = onRequest(
  { timeoutSeconds: 60, memory: "1GiB" },
  async (req, res) => {
    await app.prepare();
    handler(req, res);
  }
);
