require('dotenv').config() // Acceder a las variables de entorno

const Server = require('./models/server'); // Se importa el archivo "server.js"

const server = new Server(); // Se crea una instancia del servidor
server.listen(); // Se ejecuta el metodo "listen"