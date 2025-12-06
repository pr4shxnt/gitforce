import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'general'
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
