const {Schema, model} = require('mongoose');

const NotificationSchema = new Schema({

    to: {type: Schema.Types.ObjectId, ref: "User"},
    from: {type: Schema.Types.ObjectId, ref: "User"},
    message: {type: String},
    read: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},

});

module.exports = model('Notification', NotificationSchema);