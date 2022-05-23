const {Schema, model} = require('mongoose');

const UserSchema = new Schema({

    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    online: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
});

UserSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.id = _id;
    return object;

});

module.exports = model('User', UserSchema);