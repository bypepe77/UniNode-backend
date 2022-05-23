const {Schema, model} = require('mongoose');

const PostSchema = new Schema({

    user: {type: Schema.Types.ObjectId, ref: "User"},
    content: {type: String, required: true},
    images: [{type: String}],
    hashtags: [{type: String}],
    links: [{type: String}],
    replyTo: {type: Schema.Types.ObjectId, ref: "Post"},
    shares: [{type: Schema.Types.ObjectId, ref: "User"}],
    share: {type: Schema.Types.ObjectId, ref: "Post"},
    likes: [{type: Schema.Types.ObjectId, ref: "Likes"}],
    topTen: {type: Boolean, default: false},
    topTwenty: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},

});

module.exports = model('Post', PostSchema);