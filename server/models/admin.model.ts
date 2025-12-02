import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'superuser', 'moderator'],
        default:'moderator'
    },
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);