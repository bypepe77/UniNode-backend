const Post = require('../models/post');
const mongoose = require('mongoose');

class PostRepository {
    constructor( id ){
        this.postId = id;
        this.last24hours = new Date(Date.now() - 24*60*60 * 1000) 
    }

    async getPostById( id ){
        return await Post.findById( id );
    }

    async createPost( post ){
        return await Post.create(post);
    }

    async updatePost( post ){
        return await Post.findByIdAndUpdate( this.postId, post);
    }

    async getTrendingPosts(){
        //TODO: Refactor this 
        let trendingPosts = await Post.aggregate([
            { $match : {"createdAt":{"$gt":new Date(Date.now() - 24*60*60 * 1000)}}},
            { $unwind : "$hashtags" },
            { $group : { _id : "$hashtags", count : { $sum : 1 } } },
            { $sort : { count : -1 } },
            { $limit: 10 }
        ]);
        return trendingPosts;
    }

    async getPostByTag( tag ){
        //TODO: Make Pagination
        return await Post.find({ hashtags: tag });
    }

    async getReplies( postId ){
        return await Post.find({ replyTo: postId });
    }

    async performLike( userId ){
        const post = await Post.findById( this.postId );
        await post.likes.push( userId );
        return await post.save()
    }

    async performUnlike( userId ){
        const post = await Post.findById( this.postId );
        await post.likes.pull( userId );
        return await post.save()
    }

    async createSharedPost( post, postId){

        const updatParentPost = await Post.findByIdAndUpdate( postId, { $push: { shares: post.user } });

        if ( !updatParentPost ) return false;
        
        return await Post.create(post);
    }

    async getFeed( peopleIFollow, userId) {
        return await Post.find({$or: [{ user: peopleIFollow }, { user: userId }] }).populate('user').sort('-createdAt');
    }

    async getAllPostsFromUser( userId ){
        return await Post.find({ user: userId }).populate('user').sort('-createdAt');
    }
    async getTopTenPosts(){
        return await Post.find({createdAt: {$gt: this.last24hours}}).sort('-likes').limit(10);
    }

    async getTopTwentyPosts(){
        return await Post.find({createdAt: {$gt: this.last24hours}}).sort('-likes').limit(20);
    }

    async getTopPostsForCron( userId ){
        return await Post.find({createdAt: {$gt: this.last24hours}}).sort('-likes').limit(20);
    }

    async updatePostForTop( postId, post ){
        return await Post.findByIdAndUpdate( postId, post);
    }

    async getUserTenTopPosts( userId ){
        return await Post.find({user: userId, topTen: true}).count();
    }

    async getUserTenTwentyPosts( userId ){
        return await Post.find({user: userId, topTwenty: true}).count();
    }


}

module.exports = PostRepository;