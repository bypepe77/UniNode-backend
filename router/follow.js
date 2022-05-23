/*
    path: api/follow
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { followUser, unfollowUser } = require('../controllers/followers');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.get( '/:userToFollow', validateJWT, followUser );
router.get( '/unfollow/:userToUnfollow', validateJWT, unfollowUser );

module.exports = router;
