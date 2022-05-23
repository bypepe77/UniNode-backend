const NotificationRepository = require('../repositories/notificationRepository');

class Notification {
    constructor( id ) {
        this.notificationId = id;
    }

    async createNotification( to, from, message ) {

        const notificationRepo = new NotificationRepository( this.notificationId );

        const notificationData = {
            to,
            from,
            message,
            read: false,
            createdAt: new Date()
        }

        return notificationRepo.createNotification( notificationData );

    }

}

module.exports = Notification;