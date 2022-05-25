const { validationResult } = require('express-validator');


const validateErrors = ( req, res, next ) => {

    const errors = validationResult( req );

    if ( !errors.isEmpty() ){
        return res.status(400).json({
            status: false, 
            errors: errors.mapped() 
        });
    }

    next();

}

module.exports = {
    validateErrors
};