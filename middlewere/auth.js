import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            req.userId = decoded._id
            next()
        } catch (err) {
            return res.status(402).json({message: 'No access'})
        }
    } else {
        return res.status(403).json({message: 'No access'})
    }
}


export default auth;