import express from 'express';
import dataController from '../controllers/data.controller.js';

const router = express.Router();
const { getAllData, createData, updateData, deleteData, getDataByCodigoIndicador } = dataController;

// Ruta para obtener todos los datos
router.get('/', getAllData);

// Ruta para obtener datos por código de indicador
router.get('/:codigoIndicador', getDataByCodigoIndicador);

// Ruta para crear un nuevo dato
router.post('/create', createData);

// Ruta para actualizar un dato existente
router.put('/:fechaIndicador/:codigoIndicador', updateData);

// Ruta para eliminar un dato existente
router.delete('/:fechaIndicador/:codigoIndicador', deleteData);

export default router;

