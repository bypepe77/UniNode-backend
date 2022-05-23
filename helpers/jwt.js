const jwt = require('jsonwebtoken');

const generateToken = ( id ) => {
    
    return new Promise( (  resolve, reject ) => {
        
        const payload = { id };

        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
        }, ( err, token ) => {

            if( err ) reject( "No se ha podido generar el token" );
            
            resolve( token );
        })

    })
}

module.exports = {
    generateToken
}