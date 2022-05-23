
const UserRepository = require('../repositories/userRepository');
const FollowRepositoryClass = require('../repositories/FollowRepository');
const PostRepositoryClass = require('../repositories/postRepository');


const getUserProfile = async (req, res) => {
    //TODO: pagination for my posts

    try {
        const { username } = req.params;

        const userRepo = new UserRepository();
        const FollowRepository = new FollowRepositoryClass( );
        const PostRepository = new PostRepositoryClass();

        const user = await userRepo.getUserByUsername( username );

        if ( !user ) return res.status(404).json({ status: false, msg: 'User not found' });

        const posts = await PostRepository.getAllPostsFromUser( user.id );

        const followers = await FollowRepository.getFollowersCount( user.id );
        const following = await FollowRepository.getFollowingCount( user.id );

        const countTopTenPosts = await PostRepository.getUserTenTopPosts( user.id );
        const countTopTwentyPosts = await PostRepository.getUserTenTwentyPosts( user.id );


        res.json({ status: true, user, followers, following, countTopTenPosts, countTopTwentyPosts, posts });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
    }
    
}

const editProfile = async (req, res) => {

    try {
        const { username } = req.params;
        const { name, email } = req.body;
        const id = req.id

        const userRepo = new UserRepository( id );
        const user = await userRepo.getUserByUsername( username );
        const ifExistEmail = await userRepo.getUserByEmail( email );

        if ( !user ) return res.status(404).json({ status: false, msg: 'User not found' });
        if ( ifExistEmail ) return res.status(400).json({ status: false, msg: 'Email already exists' });
        if ( user.id !== id ) return res.status(400).json({ status: false, msg: 'You can only modify your own user' });

        user.name = name;
        user.email = email;
        
        await userRepo.updateUser(user);
        
        res.json({ status: true, user });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
    }
}

const blockUser = async (req, res) => {

    /*
        1. Obtener el usuario a bloquear
        2. Obtener el usuario que esta bloqueando
        3. Eliminar el vínculo de seguimiento entre los dos. 
        4. Si entra a su perfil hacer un res.json de que se ha bloqueado.
        5. En las rutas de follow y unfollow comprobar si esta bloqueado y no dejarlo seguir.

    */ 

    try {
        
    } catch (error) {
        
    }

}

const feed = async (req, res) => {

    // TODO: make pagination
    try {

        const id = req.id;

        const FollowRepository = new FollowRepositoryClass();
        const PostRepository = new PostRepositoryClass();

        const following = await FollowRepository.getFollowing( id );

        const peopleIFollow = following.map( item => item.followed );

        const feed = await PostRepository.getFeed( peopleIFollow, id);

        if ( !posts ) return res.status(404).json({ status: false, msg: 'Cannot load feed' });

        res.json({ status: true, feed });


        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
        
    }
}

module.exports = {
    getUserProfile,
    editProfile,
    blockUser,
    feed
}