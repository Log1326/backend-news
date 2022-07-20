import express from "express";
import {userChat,findChat,createChat} from '../controllers/chat-controller.js'

const router = express.Router()

router.post('/',createChat)
router.get('/:userId',userChat)
router.get('/find/:firstId/:secondId',findChat)

export default router;