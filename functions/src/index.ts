import { onRequest } from "firebase-functions/v2/https";
import next from "next";
import path from "path";

const isDev = process.env.NODE_ENV !== "production";

const nextServer = next({
  dev: isDev,
  // La ubicación del directorio de build de Next.js
  conf: { distDir: path.join(process.cwd(), ".next") },
});

const nextjsHandle = nextServer.getRequestHandler();

export const nextServer = onRequest(
  {
    timeoutSeconds: 60, // Aumenta el timeout para el primer arranque en frío
    region: "us-central1",
  },
  async (req, res) => {
    try {
      await nextServer.prepare();
      return await nextjsHandle(req, res);
    } catch (error) {
      console.error("Error handling request with Next.js:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);