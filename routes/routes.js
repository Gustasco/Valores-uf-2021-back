import Data from "./data.js"
import express from "express";
let router = express.Router()

// Se importa el módulo express y crea un objeto router utilizando la función Router() de Express. El objeto router se utilizará para definir las rutas de la API.

router.use("/datas", Data)

export default router