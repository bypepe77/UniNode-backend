const Follow = require('../models/follow');

class FollowRepository {
    constructor(){

    }

    async getFollowers( userId ){
        return await Follow.find({ followed: userId });
    }

    async getFollowing( userId ){
        return await Follow.find({ follower: userId });
    }

    async getFollowersCount( userId ){
        return await Follow.count({ follower: userId });
    }

    async getFollowingCount( userId ){
        return await Follow.count({ followed: userId });
    }

    async followUser( follow ){
        return await Follow.create(follow);
    }

    async deleteFollow( follow ){
        return await Follow.deleteOne({ follow });
    }

    async checkIfUserIsFollowing( me, userToCheck ){
        return await Follow.findOne({ followed: me, follower: userToCheck });
    }




}

module.exports = FollowRepository;