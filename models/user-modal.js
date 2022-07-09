import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    phone: {type: String, required: false,unique:true},
    email: {type: String, required: true,unique:true},
    passwordHash: {type: String, required: false},
    avatar: {type: String,required:false},
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)