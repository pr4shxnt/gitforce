import mongoose from "mongoose";

const broadcastMessageSchema = new mongoose.Schema({
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
        default: 'broadcast-service',
        immutable: true
    },
    recipients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }],
    attachments: [{
        filename: String,
        url: String,
        type: String
    }],
    readBy: [{
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        readAt: Date
    }]
}, { 
    timestamps: true 
});

// Index for efficient cleanup of old messages
broadcastMessageSchema.index({ createdAt: 1 });

export default mongoose.model('BroadcastMessage', broadcastMessageSchema);
