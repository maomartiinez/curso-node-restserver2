const express = require('express');
const cors = require('cors');
const app = express();
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        //conectar a bd
        this.conectarDB();
        //Middleware
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();




    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.authPath, require('../routes/auth'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log("CORRIENDO EN ", this.port);
        });
    }
    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parse del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }

}

module.exports = Server;