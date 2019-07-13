const mongoose = require('mongoose');
const Url = require('../config/parameters').Url;

module.exports = () => {
    mongoose.connect(Url, { useNewUrlParser: true})
        .then(() => console.log(`Base de datos conectada en ${Url}`))
        .catch(err => console.log(`Conexión con error ${err}`))

    process.on('SIGINT', () => {
        console.log(`Base de datos Desconectada`);
        process.exit(0)
    });
    
}