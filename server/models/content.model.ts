import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Compound index for efficient page/section queries
contentSchema.index({ page: 1, section: 1 });

export default mongoose.model('Content', contentSchema);
