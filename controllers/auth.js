const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generarJWT");
const Usuario = require('../models/usuario');

const login = async(req, res = response) => {
    const { correo, password } = req.body;


    try {


        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario /Contraseña no son correctos - Correo'
            });
        }
        //verificar si el usuario esta actibop 

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario /Contraseña no son correctos - Estado : false'
            });
        }
        //verificar la conatrseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario /Contraseña no son correctos - Contraseña incorrecta'
            });
        }

        //generar el JWT

        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

};

module.exports = {
    login
};