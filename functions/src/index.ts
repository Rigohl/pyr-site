import { onRequest } from "firebase-functions/v2/https";
import next from "next";
import path from "path";

const isDev = process.env.NODE_ENV !== "production";

// Determina la ruta correcta al directorio del proyecto principal
const projectRoot = path.join(__dirname, "..", "..");

const nextServer = next({
  dev: isDev,
  // Construye la ruta al directorio .next desde la raíz del proyecto
  conf: { distDir: path.join(projectRoot, ".next") },
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
      console.error("Error al manejar la solicitud con Next.js:", error);
      res.status(500).send("Error Interno del Servidor");
    }
  }
);