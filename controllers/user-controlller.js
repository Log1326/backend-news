import userModal from "../models/user-modal.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


export const get_current_user = async (req, res) => {
    try {
        const user = await userModal.findById(req.userId)
        if (!user) return res.status(404).json({message: 'user is not found'})
        const {passwordHash, ...data} = user._doc
        res.status(201).json(data)
    } catch (err) {
        res.status(500).json({message: 'no access'})
    }
}
export const get_user_by_id = async (req, res) => {
    const {id} = req.params
    try {
        const user = await userModal.findById(id)
        if (!user) return res.status(404).json({message: 'user is not found'})
        const {passwordHash, ...data} = user._doc
        res.status(201).json(data)
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
        res.status(201).json(users)
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
        res.status(201).json({data: user, token});
    } catch (err) {
        return res.status(500).json({message: `failed update user`})
    }
}

export const removeUser = async (req, res) => {
    const {id} = req.params
    if (req.userId !== id) return res.json({message: 'Access Denied!'})
    try {
        await userModal.findByIdAndRemove(id)
        res.status(201).json("User Deleted Successfully!");
    } catch (err) {
        return res.status(500).json({message: `failed remove user`})
    }
}

export const followUser = async (req, res) => {
    const {id} = req.params;
    try {
        if (id === req.userId) return res.json({message: 'ты не можешь на себя подписаться'})
        if (!req.userId) return res.json({message: "User is not authenticated"});
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No tour exist with id: ${id}`});
        const follow = await userModal.findById(id)
        const following = await userModal.findById(req.userId)
        const indexFollowing = following.following.findIndex((id) => id === String(id))
        indexFollowing === -1 ? following.following.push(id) : following.following = following.following.filter((id) => id !== String(id))
        const indexFollow = follow.followers.findIndex((id) => id === String(req.userId))
        indexFollow === -1 ? follow.followers.push(req.userId) : follow.followers = follow.followers.filter((id) => id !== String(req.userId))
        await userModal.findByIdAndUpdate(id, follow, {new: true})
        await userModal.findByIdAndUpdate(req.userId, following, {new: true})
        res.status(200).json(indexFollow === -1 ? {message: `subscribed`} : {message: 'unsubscribed'})
    } catch (err) {
        return res.status(500).json({message: `failed followers user`})
    }
}
