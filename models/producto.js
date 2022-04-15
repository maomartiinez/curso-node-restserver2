const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    //se referencia al modelo usuario para relacionarlo
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    precio: {
        type: Number,
        default: 0
    },
    //se referencia al modelo categoria para relacionarlo
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },


});


ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;

};

module.exports = model('Producto', ProductoSchema);