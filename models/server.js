const express = require('express');
const cors = require('cors');
const app = express();
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            uploads: '/api/uploads'


        };
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
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));

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

        //fileupload - carga de archivos - se configuira para poder aceptar archivos

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

}

module.exports = Server;