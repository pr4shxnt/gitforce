import mongoose from 'mongoose'

export default async function connectToDatabase(): Promise<typeof mongoose> {
    const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/myapp'
    try {
        await mongoose.connect(uri)
        console.log(`MongoDB connected: ${uri}`)
        return mongoose
    } catch (err) {
        console.error('Failed to connect to MongoDB', err)
        throw err
    }
}
