const res = require('express/lib/response');
const jwt = require('jsonwebtoken');


const validateJWT = ( req, res, next ) => {

    try {

        const token = req.header('x-token');

        if ( !token ) return res.status(401).json({ status: false, msg: 'No hay token en la petición' });

        const { id } = jwt.verify( token, process.env.SECRET_KEY );

        req.id = id

        next()


        
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Token no válido'
        });
    }

}

module.exports = {
    validateJWT
}