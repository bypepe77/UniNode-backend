/*
    path: api/posts
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createNewPost, getTrendingPosts, getPostsByTag, getDetailPost, commentPost, likePost, unlikePost, sharePost, getTopTenPosts, getTopTwentyPosts } = require('../controllers/posts');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post( '/new', validateJWT, createNewPost );
router.get( '/:id', validateJWT, getDetailPost )
router.get( '/trending/a', validateJWT, getTrendingPosts );
router.post( '/tag', validateJWT, getPostsByTag );
router.post( '/comment/:postId', validateJWT, commentPost );
router.post( '/share/:postId', validateJWT, sharePost );
router.post( '/like/:postId', validateJWT, likePost );
router.post( '/unlike/:postId', validateJWT, unlikePost );
router.get( '/top/ten', validateJWT, getTopTenPosts);
router.get( '/top/twenty', validateJWT, getTopTwentyPosts);

module.exports = router;
