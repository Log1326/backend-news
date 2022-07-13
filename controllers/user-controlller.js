import userModal from "../models/user-modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


export const get_user = async (req, res) => {
    try {
        const user = await userModal.findById(req.userId)
        if (!user) return res.status(404).json({message: 'user is not found'})
        const {passwordHash, ...data} = user._doc
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({message: 'no access'})
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let users = await userModal.find().exec()
        users = users.map((user) => {
            const {phone, passwordHash, email, ...data} = user._doc
            return data
        })
        res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({message: `failed get users`})
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id
    const {firstName, lastName, phone, avatar, email} = req.body
    try {
        const updateUser = {firstName, lastName, phone, avatar, email, _id: id}
        const oldUser = await userModal.findByIdAndUpdate(id, updateUser, {new: true})
        const token = jwt.sign({_id: oldUser._id}, process.env.JWT_ACCESS_SECRET,
            {expiresIn: '1h'})
        const {passwordHash, ...user} = oldUser._doc
        res.status(200).json({user, token});
    } catch (err) {
        return res.status(500).json({message: `failed update user`})
    }
}

export const removeUser = async (req, res) => {
    const {id} = req.params
    if (req.userId !== id) return res.json({message: 'Access Denied!'})
    try {
        await userModal.findByIdAndRemove(id)
        res.status(200).json("User Deleted Successfully!");
    } catch (err) {
        return res.status(500).json({message: `failed remove user`})
    }
}

export const followUser = async (req, res) => {
    const {id} = req.params;
    const {_id} = req.body;

    try {
        if (!req.userId) return res.json({message: "User is not authenticated"});
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No tour exist with id: ${id}`});
        const follow = await userModal.findById(id)
        const indexFollow = follow.followers.findIndex((id) => id === String(req.userId))
        indexFollow === -1 ? follow.followers.push(req.userId) : follow.followers = follow.followers.filter((id) => id !== String(req.userId))
        await userModal.findByIdAndUpdate(id, follow, {new: true})
        res.status(200).json(indexFollow === -1 ? {message: `subscribed`} : {message: 'unsubscribed'})
    } catch (err) {
        return res.status(500).json({message: `failed followers user`})
    }
}
export const unFollowUser = async (req, res) => {
    // following

}