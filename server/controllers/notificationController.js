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

exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "notification marked as read",
            notification
        })
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
};

