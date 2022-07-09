const express = require('express') // Paquete "express"
const cors = require('cors') // Paquete "cors"

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // Middlewares
        this.middlewares();
        // Rutas de la aplicacion
        this.routes();
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