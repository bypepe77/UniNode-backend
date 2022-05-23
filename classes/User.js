const FollowRepo = require('../repositories/FollowRepository');

class User { 

    constructor( id ){
        this.userId = id;
    }

    async getUser(){
        return await User.findById(this.userId);
    }



}

module.exports = User