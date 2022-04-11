const { response, request } = require('express');

const usuariosGet = (req, res = response) => {
    const query = req.query;
    res.json({
        msg: 'get Api  Controlador',
        query
    });
};

const usuariosPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;
    res.json({
        msg: 'post Api  Controlador',
        nombre,
        edad
    });
};

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put Api  Controlador',
        id
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch Api  Controlador'
    });
};


const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete Api  Controlador'
    });
};


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}