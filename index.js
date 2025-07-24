import "dotenv/config";
import express from "express";
import cors from "cors";

import productsRouter from "./src/routes/products.router.js";
import authRouter from "./src/routes/auth.router.js";

const app = express();

// Middlewares globales
app.use(cors()); // habilita CORS para todas las rutas
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos a mi API de productos" });
});

// Rutas de la API
app.use("/api", productsRouter);
app.use("/api/auth", authRouter);

// Middleware para rutas no definidas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Puerto y ejecución del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
