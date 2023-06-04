import Data from '../models/data.schema.js'

// Controlador para obtener todos los datos, mas no se utiiliza dado que solo requiero el de "UF"
const getAllData = async (req, res) => {
    try {
        const data = await Data.find();
        return res.json(data)
    } catch (error) {
        console.error('Error al obtener todos los datos:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos' });
    }
};

//La función getDataByCodigoIndicador se utiliza para obtener los datos que coinciden con un código de indicador específico. Recibe el código de indicador como parámetro de la URL (req.params.codigoIndicador). Luego, busca los documentos en la colección Data que tengan ese código de indicador y los retorna en formato JSON. Si no se encuentran datos con el código de indicador proporcionado, se devuelve un error 404.
const getDataByCodigoIndicador = async (req, res) => {
    const codigoIndicador = req.params.codigoIndicador;

    try {
        const data = await Data.find({ codigoIndicador });
        if (!data) {
            return res.status(404).json({ error: 'No se encontraron datos con ese código de indicador' });
        }

        return res.json(data);
    } catch (error) {
        console.error('Error al obtener datos por código de indicador:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos' });
    }
};

// La función createData se utiliza para crear nuevos datos. Recibe los datos a través del cuerpo de la solicitud (req.body). Crea una nueva instancia del modelo Data utilizando esos datos y la guarda en la base de datos. Luego, devuelve el dato guardado en formato JSON con un código de estado 201 (creado correctamente). Si ocurre algún error durante el proceso de creación, se devuelve un error 500 con un mensaje descriptivo.
const createData = async (req, res) => {
    try {
        const newData = new Data(req.body);
        const savedData = await newData.save();
        return res.status(201).json(savedData);
    } catch (error) {
        console.error('Error al crear el dato:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear el dato' });
    }
};

// La función updateData se utiliza para actualizar datos existentes. Recibe la fecha del indicador y el código del indicador a través de los parámetros de la URL (req.params). Además, recibe el nuevo valor del indicador a través del cuerpo de la solicitud (req.body.nuevoValorIndicador). La función busca un documento en la colección Data que coincida con la fecha y el código proporcionados y actualiza el campo valorIndicador con el nuevo valor. Luego, devuelve el dato actualizado en formato JSON. Si no se encuentra el dato a actualizar, se devuelve un error 404.
const updateData = async (req, res) => {
    const { fechaIndicador, codigoIndicador } = req.params;
    const { nuevoValorIndicador } = req.body;

    try {
        const updatedData = await Data.findOneAndUpdate(
            { fechaIndicador, codigoIndicador },
            { $set: { valorIndicador: nuevoValorIndicador } },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ error: 'No se encontró el dato a actualizar' });
        }

        return res.json(updatedData);
    } catch (error) {
        console.error('Error al actualizar el dato:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el dato' });
    }
};



// La función deleteData se utiliza para eliminar datos. Recibe la fecha del indicador y el código del indicador a través de los parámetros de la URL (req.params). Luego, busca y elimina los documentos en la colección Data que coincidan con la fecha y el código proporcionados. Si la operación se realiza con éxito, se devuelve un mensaje de éxito en formato JSON. En caso de error, se devuelve un error 500 con un mensaje descriptivo.
const deleteData = async (req, res) => {
    try {
        const { fechaIndicador, codigoIndicador } = req.params;

        // Buscar y eliminar los datos utilizando la fecha y el código
        await Data.deleteMany({ fechaIndicador, codigoIndicador });

        return res.json({
            message: 'Datos eliminados exitosamente',
        });
    } catch (error) {
        console.error('Error al eliminar los datos:', error);
        return res.status(500).json({
            message: 'Error al eliminar los datos',
        });
    }
};

const dataController = {
    getAllData,
    getDataByCodigoIndicador,
    createData,
    updateData,
    deleteData
};

export default dataController;
