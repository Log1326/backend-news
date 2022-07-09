import express from 'express'
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./router/api.js";

import mongoose from "mongoose";

const app = express();

dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


//router
app.use('/api', router)
app.use('/api/uploads', express.static('uploads'))

//port
const port = 5000 || process.env.PORT
//connect
mongoose
    .connect(process.env.MONGOOSE_CONNECT)
    .then(() => app.listen(port, () => console.log(`server start on port: ${port}`)))
    .catch((error) => console.log(`we wrong,did connect : ${error}`))


