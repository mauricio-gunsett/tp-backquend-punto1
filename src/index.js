import express from "express";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";

// 1. inicio app 
const app = express();

// 2. Configuraciones generales
const PORT = process.env.PORT || 5000;

// 3. Middlewares
app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

// 4. Rutas
app.use(userRouter);


// 5. Iniciar el loop del servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
  });