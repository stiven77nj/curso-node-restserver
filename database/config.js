const mongoose = require('mongoose'); // paquete "mongoose"

// Funcion para la conexion a la base de datos
const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONDGODB_ATLAS );
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

// Se exporta la conexion a la base de datos
module.exports = {
    dbConnection
}