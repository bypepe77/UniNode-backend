const User              = require('../models/user');
const bcrypt            = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');


const createUser = async (req, res) => {

    try {
        
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        
        if ( userExists ) return res.status(400).json({ status: false, msg: 'Error al crear el usuario' });

        const user = new User( req.body );

        const salt = await bcrypt.genSaltSync();

        user.password = await bcrypt.hashSync( password, salt );

        await user.save();

        const token = await generateToken( user.id );

        res.json({ ok: true, user, token});


    } catch (error) {
        res.status(500).json({
            status: false, 
            message: 'Error al crear el usuario'
        })
    }
}

const performLogin = async (req, res) => {
    
    try {
        
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if ( !user ) return res.status(404).json({ status: false, msg: 'Error al hacer login' })

        const validPassword = await bcrypt.compareSync( password, user.password );

        if ( !validPassword ) return res.status(404).json({ status: false, msg: 'Error al hacer login' });

        const token = await generateToken( user.id );

        res.json({ status: true, user, token });


    } catch (error) {
        res.status(500).json({
            status: false, 
            message: 'Error'
        })
    }


}

const renewToken = async (req, res) => {

    const id = req.id;

    const token = await generateToken( id );

    const user = await User.findById( id );

    res.json({ status: true, id , user, token})
}

module.exports = {
    createUser,
    performLogin,
    renewToken
}