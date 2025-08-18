const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
        .sort({ createdAt: -1 })
        .limit(50);

        if (!notifications || notifications.length === 0) {
            return res.status(200).json({
                success: true,
                notifications: []
            })
        }
        return res.status(200).json({
            success: true,
            notifications
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}