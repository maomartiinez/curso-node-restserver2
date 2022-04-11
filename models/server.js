const express = require('express');
const cors = require('cors');
const app = express();


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middleware
        //rutas de mi aplicacion
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));

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