const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        userId: { type: String, required: true },
        userEmail: { type: String },
        userMobileNumber: { type: String },
        mediumId: { type: Number, required: true },
        languageId: { type: Number },
        plannedSendTime: { type: Date },
        priority: { type: Number },
        status: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
