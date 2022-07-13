import express from 'express'
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRouter from './router/auth-router.js'
import userRouter from './router/user-router.js'
import newsRouter from './router/news-router.js'
import uploadRouter from './router/upload-router.js'
import chatRouter from './router/chat-router.js'
import messageRouter from './router/message-router.js'
import mongoose from "mongoose";

const app = express();

dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


//router
app.use('/auth', authRouter)
app.use('/', userRouter)
app.use('/news', newsRouter)
app.use('/file', uploadRouter)
app.use('/chat', chatRouter)
app.use('/message', messageRouter)
app.use('/uploads', express.static('uploads'))

//port
const port =  5000|| process.env.PORT
//connect
mongoose
    .connect(process.env.MONGOOSE_CONNECT)
    .then(() => app.listen(port, () => console.log(`server start on port: ${port}`)))
    .catch((error) => console.log(`we wrong,did connect : ${error}`))


