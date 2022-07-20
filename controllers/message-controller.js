import messageModal from "../models/message-modal.js";

export const addMessage = async (req, res) => {
    const {chatId, sendId, text} = req.body
    try {
        const message = await messageModal.create({
            chatId, sendId, text
        })
        res.status(200).json(message)
    } catch (err) {
        res.status(500).json({message: `add message failed`})
    }
}

export const getMessage = async (req, res) => {
    const {chatId} = req.params
    try {
        const result = await messageModal.find({chatId})
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({message: `get message failed`})
    }
}