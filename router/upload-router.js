import express from "express";
import {upload, upload_image} from "../controllers/upload.js";


const router = express.Router()

router.post('/upload', upload.single('image'), upload_image)//uploads


export default router;