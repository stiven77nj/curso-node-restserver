const express = require('express') // Paquete "express"
const cors = require('cors') // Paquete "cors"

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Rutas 
        this.usuariosPath = '/api/usuarios'; // Usuarios
        this.authPath = '/api/auth'; // Autenticacion
        this.categoriasPath = '/api/categorias'; // Categorias
        // Conectar a base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Rutas de la aplicacion
        this.routes();
    }

    // Metodo para conectar a base de datos
    async conectarDB() {
        await dbConnection();
    }

    // Metodo middlewares
    middlewares() {
        // CORS 
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
         // Directorio publico
        this.app.use( express.static('public') );
    }

    // Metodo para manejar las rutas
    routes() {
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.categoriasPath, require('../routes/categorias') );
        this.app.use( this.usuariosPath, require('../routes/usuarios') );
    }

    // Metodo para manejar el puerto en que se escucha
    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto...', this.port );
        }); // Puerto
    }
}

// Exportacion del servidor
module.exports = Server;