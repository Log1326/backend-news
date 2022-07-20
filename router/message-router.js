import express from "express";
import {getMessage, addMessage} from '../controllers/message-controller.js'

const router = express.Router()

router.post('/', addMessage)
router.get('/:chatId', getMessage)


export default router;