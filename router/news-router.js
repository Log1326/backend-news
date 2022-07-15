import express from "express";
import {
    createNews, deleteNews,
    getAllNews,
    getNews,
    getNewsByUser, likeNews,
    newsByTag,
    relatedNews,
    searchNews, updateNews
} from "../controllers/news-controller.js";
import auth from "../middlewere/auth.js";
import {
    HandleErrorValidations,
    patch_update_validation,
    post_create_validation
} from "../validations/validationsAll.js";


const router = express.Router()


//news router
router.get('/:id', getNews) //get one news
router.get('/user_by_news/:id', auth, getNewsByUser)//get news of user id
router.get('/find/search', searchNews) //searchQuery
router.get('/tags/:tag', newsByTag) //search tag
router.post('/related_tags', relatedNews)  //search relatives news , but this is not work now
router.get('/', getAllNews) //all news
router.post('/create', auth, post_create_validation, HandleErrorValidations, createNews) //create news
router.delete('/:id', auth, deleteNews)//remove news
router.put('/update/:id', auth, patch_update_validation, HandleErrorValidations, updateNews) //update news
router.patch('/like/:id', auth, likeNews) //likes news


export default router