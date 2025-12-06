import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    github: String,
    linkedin: String,
    email: String,
    order: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('TeamMember', teamMemberSchema);
