const PostRepository = require('../repositories/postRepository');

class Post {

    constructor( id ){
        this.postId = id;
    }

    findHashtags( text ){
        const regex = /#(\w+)/g;
        const hashtags = text.match(regex);
        return hashtags;
    }

    findLinks( text ){
        const regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
        const links = text.match(regex);
        return links;
    }

    async findIfLikeExists ( userId ){

        const postRepository = new PostRepository()
        
        const post = await postRepository.getPostById( this.postId );

        const ifExistsLike = post.likes.includes( userId );

        return ifExistsLike;
    }

    async findIfSharedByMe( userId ){
            
        const postRepository = new PostRepository()
            
        const post = await postRepository.getPostById( this.postId );
    
        const ifExistsShared = await post.shares.includes( userId );

        console.log(ifExistsShared);
    
        return ifExistsShared;
    }

}

module.exports = Post;