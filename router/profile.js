/*
    path: api/profile
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUserProfile, editProfile, feed } = require('../controllers/profile');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.get(  '/:username', validateJWT , getUserProfile );
router.post( '/edit/:username', validateJWT, editProfile );
router.get(  '/load/feed', validateJWT, feed );

module.exports = router;
