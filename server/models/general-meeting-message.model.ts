import mongoose from "mongoose";

const generalMeetingMessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    chatType: {
        type: String,
        default: 'general-meeting',
        immutable: true
    },
    attachments: [{
        filename: String,
        url: String,
        type: String
    }]
}, { 
    timestamps: true 
});

// Index for efficient cleanup of old messages
generalMeetingMessageSchema.index({ createdAt: 1 });

export default mongoose.model('GeneralMeetingMessage', generalMeetingMessageSchema);
