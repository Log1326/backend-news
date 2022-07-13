import {HandleErrorValidations, sign_in_validation, sign_up_validation} from "../validations/validationsAll.js";
import {sign_in, sign_up} from "../controllers/auth-controller.js";
import express from "express";

const router = express.Router()

router.post('/signin', sign_in_validation, HandleErrorValidations, sign_in) //login
router.post('/signup', sign_up_validation, HandleErrorValidations, sign_up) //register

export default router;