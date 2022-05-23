const Notification = require('../models/notification');

class NotificationRepository {

    constructor( notificationId ){
        this.notificationId = notificationId;
    }

    async createNotification( notificationData ){
        const notification = new Notification( notificationData );

        return await notification.save();
    }
}

module.exports = NotificationRepository;