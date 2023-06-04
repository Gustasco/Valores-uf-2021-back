import mongoose from 'mongoose'

//El código define un esquema de datos utilizando la biblioteca Mongoose, que es una herramienta de modelado de objetos de MongoDB para Node.js.

const dataSchema = new mongoose.Schema({
    nombreIndicador: { type: String },
    codigoIndicador: { type: String },
    unidadMedidaIndicador: { type: String },
    valorIndicador: { type: Number },
    fechaIndicador: { type: String },
});

const Data = mongoose.model('/data', dataSchema);

export default Data
