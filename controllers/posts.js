const PostRepository = require('../repositories/postRepository');
const postClass = require('../classes/Post');
const Post = require('../models/post');
const NotificationClass = require('../classes/Notification');

const createNewPost = async (req, res) => {

    //TODO: Validate the post data

    try {
        const { content, images } = req.body;
        const id = req.id
    
        const newPost = new Post({ content, user: id });
    
        const postService = new PostRepository();

        //TODO: Find a better name for this method
        const postHelpers = new postClass();
    
        const hashtags = postHelpers.findHashtags( content )
        const links = postHelpers.findLinks( content )
        
        newPost.hashtags = hashtags;
        newPost.links = links;
    
        const postCreated = await postService.createPost( newPost )

        if ( !postCreated ) return res.status(400).json({ status: false, msg: 'Post cannot be created' });
    
        res.json({ status: true, post: postCreated });
    

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
        
    }
}

const getDetailPost = async (req, res) => {

    try {

        const { id } = req.params;

        const postService = new PostRepository();

        const post = await postService.getPostById( id );
        const replies = await postService.getReplies( id );

        if ( !post ) return res.status(400).json({ status: false, msg: 'Post not found' });

        res.json({ status: true, post, replies });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })

    }
}

const getTrendingPosts = async (req, res) => {

    try {
        const postService = new PostRepository();
        const trendingPosts = await postService.getTrendingPosts();

        if ( !trendingPosts ) return res.status(400).json({ status: false, msg: 'No posts found' });

        res.json({ status: true, trending: trendingPosts });


    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })

    }
}

const getPostsByTag  = async (req, res) => {
    
    try {
        
        const postService = new PostRepository();
        const posts = await postService.getPostByTag( req.body.tag );

        if ( !posts ) return res.status(200).json({ status: false, msg: 'No posts found' });

        res.json({ status: true, posts: posts });



    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
    }
        
}

const commentPost = async (req, res) => {

    try {
        const { postId } = req.params;
        const { content } = req.body;
        const id = req.id;

        const postService = new PostRepository();
        const Notification = new NotificationClass();

        const post = await postService.getPostById( postId );

        if ( !post ) return res.status(400).json({ status: false, msg: 'Post not found' });

        const newComment = new Post({ content, user: id, replyTo: postId });

        const postHelpers = new postClass();
    
        const hashtags = postHelpers.findHashtags( content )
        const links = postHelpers.findLinks( content )
        
        newComment.hashtags = hashtags;
        newComment.links = links;

        const commentCreated = await postService.createPost( newComment );

        if ( !commentCreated ) return res.status(400).json({ status: false, msg: 'Comment cannot be created' });

        const notification = await Notification.createNotification( id, post.user, "ha comentado en tu publicación!" );

        if( !notification ) console.log("error creating notification");

        res.json({ status: true, comment: commentCreated });

        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
        
    }
    
}

const sharePost = async (req, res) => {

    try {
        const { postId } = req.params;
        const { content } = req.body;
        const id = req.id;

        const postService = new PostRepository();
        const Notification = new NotificationClass();

        const post = await postService.getPostById( postId );
        const postHelpers = new postClass( postId );

        if ( !post ) return res.status(400).json({ status: false, msg: 'Post not found' });

        const isSharedByMe = await postHelpers.findIfSharedByMe( id );

        if ( isSharedByMe ) return res.status(400).json({ status: false, msg: 'You already shared this post' });

        const newShare = new Post({ content, user: id, share: postId });

        const hashtags = postHelpers.findHashtags( content )
        const links = postHelpers.findLinks( content )
        
        newShare.hashtags = hashtags;
        newShare.links = links;

        const sharePost = await postService.createSharedPost( newShare, postId );

        if ( !sharePost ) return res.status(400).json({ status: false, msg: 'Post cannot be shared' });

        const notification = await Notification.createNotification( id, post.user, "ha compartido tu publicación!" );

        if( !notification ) console.log("error creating notification");

        res.json({ status: true, share: sharePost });

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
        
    }
}

const likePost = async (req, res) => {

    try {
        const { postId } = req.params;
        const id = req.id;
        
        const postHelpers = new postClass( postId );
        const postService = new PostRepository( postId );
        const Notification = new NotificationClass();

        const post = await postService.getPostById( postId );

        const ifLikeExists = await postHelpers.findIfLikeExists( id );

        console.log("liked?", ifLikeExists) 

        if ( ifLikeExists ) return res.status(400).json({ status: false, msg: 'You already liked this post' });

        const like = await postService.performLike( id )

        if ( !like ) return res.status(400).json({ status: false, msg: 'Like cannot be created' });

        const notification = await Notification.createNotification( id, post.user, "le ha gustado tu publicación!" );

        if( !notification ) console.log("error creating notification");

        res.json({ status: true, like: "You liked this post!" });

        
    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
        
        
    }
}

const unlikePost = async (req, res) => {

    try {

        const { postId } = req.params;
        const id = req.id;

        const postHelpers = new postClass( postId );
        const postService = new PostRepository( postId );

        const ifLikeExists = await postHelpers.findIfLikeExists( id );

        if ( !ifLikeExists ) return res.status(400).json({ status: false, msg: 'You did not like this post' });

        const unlike = await postService.performUnlike( id )

        if ( !unlike ) return res.status(400).json({ status: false, msg: 'Unlike cannot be created' });

        res.json({ status: true, unlike: "You unliked this post!" });

        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
        
    }
}

const getTopTenPosts = async (req, res) => {

    try {
        const postService = new PostRepository();
        const topTenPosts = await postService.getTopTenPosts();

        if ( !topTenPosts ) return res.status(400).json({ status: false, msg: 'No posts found' });

        res.json({ status: true, topTenPosts });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
    }
        
}

const getTopTwentyPosts = async (req, res) => {

    try {
        const postService = new PostRepository();
        const topTwentyPosts = await postService.getTopTwentyPosts();

        if ( !topTwentyPosts ) return res.status(400).json({ status: false, msg: 'No posts found' });

        res.json({ status: true, topTwentyPosts });
        
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
        
    }
}

module.exports = {
    createNewPost,
    getTrendingPosts,
    getPostsByTag,
    getDetailPost,
    commentPost,
    likePost,
    unlikePost,
    sharePost,
    getTopTenPosts,
    getTopTwentyPosts
}