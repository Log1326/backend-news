import bcrypt from "bcrypt";
import userModal from "../models/user-modal.js";
import jwt from "jsonwebtoken";

export const sign_up = async (req, res) => {
    const {email, password, firstName, lastName, phone, avatar} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await userModal.create({email, passwordHash: hashedPassword, firstName, lastName, phone, avatar});
        const token = jwt.sign({_id: user._id}, process.env.JWT_ACCESS_SECRET, {expiresIn: "1h",});
        const {passwordHash, ...data} = user._doc
        res.status(201).json({data, token});
    } catch (err) {
        return res.status(500).json({message: `something wrong with sign up, i show you: ${err}`})
    }
}


export const sign_in = async (req, res) => {
    const {email, password} = req.body
    try {
        const oldUser = await userModal.findOne({email})
        if (!oldUser) return res.status(404).json({message: `user doesn't exist`})
        const isValidPassword = await bcrypt.compare(password, oldUser._doc.passwordHash)
        if (!isValidPassword) return res.status(400).json({message: 'credital invidital'})
        const token = jwt.sign({_id: oldUser._id}, process.env.JWT_ACCESS_SECRET,
            {expiresIn: '1h'})
        const {passwordHash, ...data} = oldUser._doc
        res.status(200).json({data, token})
    } catch (err) {
        return res.status(500).json({message: `failed auth in`})
    }
}
