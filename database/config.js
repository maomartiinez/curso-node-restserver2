const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('Bases de datos en linea');
    } catch (error) {
        console.log(error);
        throw new Error("Error al inicializar BD");
    }

}
module.exports = {
    dbConnection

}