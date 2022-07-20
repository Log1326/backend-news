import chatModal from "../models/chat-modal.js";


export const createChat = async (req, res) => {
    const {sendId, receiveId} = req.body
    try {
        const newChat = await chatModal.create({
            members: [sendId, receiveId]
        })
        res.status(200).json(newChat)
    } catch (err) {
        res.status(500).json({message: `create chat failed`})
    }
}

export const userChat = async (req, res) => {
    const {userId} = req.params
    try {
        const chat = await chatModal.find({members: {$in: userId}})
        res.status(201).json(chat)
    } catch (err) {
        res.status(500).json({message: `userID chat failed`})
    }
}

export const findChat = async (req, res) => {
    const {firstId, secondId} = req.params
    try {
        const chat = await chatModal.findOne({
            members: {$all: [firstId, secondId]}
        })
        res.status(201).json(chat)
    } catch (err) {
        res.status(500).json({message: `find chat failed`})
    }
}