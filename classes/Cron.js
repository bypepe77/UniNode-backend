const PostRepo = require('../repositories/postRepository');
const PostModel = require('../models/post');

class Cron {
    constructor( id ){
        this.cronId = id
    }

    async updatePostWithTop(  ){
        const PostRepository = new PostRepo();
        const posts = await PostRepository.getTopPostsForCron();

        //TODO: Refactor this

        const postsWithTop = posts.forEach( (element, index) => {
            if ( element.topTen === false && index <= 10 || element.topTwenty === false && index > 10 ){
                const newTopTen = index <= 10 ? true : false;
                const newTopTwenty = index <= 20 && index > 10 ? true : false;
                const updatePost = new PostModel( element );

                updatePost.topTen = newTopTen;
                updatePost.topTwenty = newTopTwenty;

                let newPost = PostRepository.updatePostForTop( element._id, updatePost );

                if( newPost ) console.log("ok")
            }
        });
    }
}

module.exports = Cron;