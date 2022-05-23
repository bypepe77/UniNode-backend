/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, performLogin, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateErrors } = require('../middlewares/validateErrors');

const router = Router();


router.post( '/new', [
    check('name', 'El Nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('username', 'EL usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateErrors
],createUser);


router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateErrors
] ,performLogin)

router.get( '/renew', validateJWT , renewToken)



module.exports = router;
