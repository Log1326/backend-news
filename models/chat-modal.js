import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
        members: {type: []}
    },
    {timestamps: true,}
);

export default mongoose.model("Chat", ChatSchema);
