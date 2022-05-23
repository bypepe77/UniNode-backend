const User = require('../models/user');

class UserRepository {
    constructor(id){
        this.userId = id
    }

    async getUser(){
        return await User.findById(this.userId);
    }

    async getUserByUsername(username){
        return await User.findOne({username});
    }

    async updateUser(user){
        return await User.findByIdAndUpdate(this.userId, user, {new: true});
    }

    async deleteUser(){
        return await User.findByIdAndDelete(this.userId);
    }

    async getUserByEmail(email){
        return await User.findOne({email});
    }

}

module.exports = UserRepository;