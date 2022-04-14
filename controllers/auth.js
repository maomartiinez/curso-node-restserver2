const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { json } = require("express/lib/response");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");
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

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;
    try {
        const { nombre, correo, img } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                rol: 'USER_ROLE',
                img,
                google: true
            }
            usuario = new Usuario(data);
            console.log(usuario);
            await usuario.save();

        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'

        });
    }
};


module.exports = {
    login,
    googleSignIn
};