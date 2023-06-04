import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();

//Configura y establece la conexión a la base de datos MongoDB. Aquí, se establece la opción strictQuery en false para permitir consultas flexibles. Luego, se utiliza el método connect de mongoose para conectar a la base de datos MongoDB. Si la conexión es exitosa, se muestra un mensaje en la consola. Si hay un error, se muestra un mensaje de error.
mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://***:****@cluster0.2mpqigj.mongodb.net/")
    .then(() => {
        console.log('Conexión a MongoDB exitosa');
    })
    .catch(error => {
        console.error('Error al conectar a MongoDB:', error);
    });
//

//Configura el middleware body-parser para analizar las solicitudes entrantes. Aquí, se habilita el análisis de datos codificados en URL (urlencoded) y el análisis de datos JSON.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//

//Configura el middleware cors para permitir solicitudes desde diferentes dominios. Esto permite que el servidor responda a solicitudes de otros orígenes.
app.use(cors());
//

//Asocia las rutas definidas en el objeto router a la ruta base "/api". Esto significa que todas las rutas definidas en el archivo routes.js estarán disponibles a través de "/api".
app.use('/api', router);
//

//Inicia el servidor en el puerto 3000 y muestra un mensaje en la consola para confirmar que el servidor se ha iniciado correctamente.
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
//
