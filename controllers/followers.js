const UserClass = require('../classes/User');
const FollowRepositoryClass = require('../repositories/FollowRepository');
const Follow = require('../models/follow');
const NotificationClass = require('../classes/Notification');

const followUser = async (req, res) => {

    try {
        
        const userToFollow = req.params.userToFollow;
        const me = req.id

        const FollowRepository = new FollowRepositoryClass();
        const Notification = new NotificationClass()

        const iFollowThisUser = await FollowRepository.checkIfUserIsFollowing( me, userToFollow );

        if( iFollowThisUser ) return res.status(400).json({status: false, msg: 'You are already following this user'});

        const newFollow = new Follow({ followed: me, follower: userToFollow })

        const follow = await FollowRepository.followUser( newFollow );

        if ( !follow ) return res.status(400).json({status: false, msg: "Could not follow user"});
        
        const notification = await Notification.createNotification( userToFollow, me, "Te ha empezado a seguir" );

        if( !notification ) console.log("error creating notification");

        return res.status(200).json({status: true, msg: "User followed"});

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
    }

}

const unfollowUser = async (req, res) => {

    try {
        
        const userToUnfollow = req.params.userToUnfollow;
        const me = req.id

        const FollowRepository = new FollowRepositoryClass();

        const iFollowThisUser = await FollowRepository.checkIfUserIsFollowing( me, userToUnfollow );

        if( !iFollowThisUser ) return res.status(400).json({status: false, msg: 'You are not following this user '});

        const unfollow = await FollowRepository.deleteFollow( iFollowThisUser );

        if ( !unfollow ) return res.status(400).json({status: false, msg: "Could not unfollow user"});

        res.status(200).json({status: true, msg: "User unfollowed"});

        
    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            status: false,
            message: 'Error performing the request'
        })
    }
}


module.exports = {
    followUser,
    unfollowUser
};