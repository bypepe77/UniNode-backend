const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("conectado a ", process.env.MONGO_URL)

    }catch ( error ){
        
        console.log("Error al conecta a la base de datos", error)
    }
}

module.exports = {
    dbConnection
};