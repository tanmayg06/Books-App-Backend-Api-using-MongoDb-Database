import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: Number,
    favorites: [Number]
});

export default mongoose.model('User', userSchema);