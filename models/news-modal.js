import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    tags: {type: Array, default: []},
    imageUrl: String,
    viewsCount: {type: Number, default: 0},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    likes: {type: [String], default: [],},
}, {
    timestamps: true,
})

export default mongoose.model('News', newsSchema)