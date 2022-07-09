import express from "express";
import auth from '../middlewere/auth.js'
import {get_user, sign_in, sign_up, getAllUsers} from '../controllers/user-controlller.js'
import {
    createNews,
    deleteNews,
    getAllNews,
    getNews,
    getNewsByUser,
    likeNews,
    newsByTag,
    relatedNews, searchNews,
    updateNews
} from '../controllers/news-controller.js'
import {
    HandleErrorValidations,
    patch_update_validation,
    post_create_validation,
    sign_in_validation,
    sign_up_validation
} from '../validations/validationsAll.js'
import {upload, upload_image} from "../controllers/upload.js";

const router = express.Router()
//auth router
router.post('/auth/signin', sign_in_validation, HandleErrorValidations, sign_in) //login
router.post('/auth/signup', sign_up_validation, HandleErrorValidations, sign_up) //register
router.get('/auth/me', auth, get_user) //get user current
router.get('/users', getAllUsers)

//news router
router.get('/news/:id', getNews) //get one news
router.get('/news/user_by_news/:id', auth, getNewsByUser)//get news of user id
router.get('/search', searchNews) //searchQuery
router.get('/tags/:tag', newsByTag) //search tag
router.get('/newsAll', getAllNews) //all news

router.post('/news/create', auth, post_create_validation, HandleErrorValidations, createNews) //create news
router.post('/news/related_tours', relatedNews)  //search relatives news , but this is not work now

router.delete('/news/:id', auth, deleteNews)//remove news

router.patch('/news/:id', auth, patch_update_validation, HandleErrorValidations, updateNews) //update news
router.patch('/like/:id', auth, likeNews) //likes news

//upload file
router.post('/upload', upload.single('image'), upload_image)//uploads

export default router