import multer from 'multer'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
export const upload = multer({storage})
export const upload_image = (req, res) => {
    res.json({url: `/uploads/${req.file.originalname}`})
}
