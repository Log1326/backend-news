import express from "express";
import auth from "../middlewere/auth.js";
import {followUser, get_user, getAllUsers, removeUser, updateUser} from "../controllers/user-controlller.js";


const router = express.Router()

router.get('/user', auth, get_user)
router.get('/users', getAllUsers)
router.put('/user/:id/update', auth, updateUser)
router.delete('/user/:id/remove', auth, removeUser)
router.patch('/user/:id/follow', auth, followUser)
export default router