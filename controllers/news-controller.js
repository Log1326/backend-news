import mongoose from "mongoose";
import newsModal from "../models/news-modal.js";

export const createNews = async (req, res) => {
    const {title, description, tags, imageUrl} = req.body
    try {
        const newNews = await newsModal.create({
            title,
            description,
            tags: tags.split(','),
            imageUrl,
            creator: req.userId
        })
        res.status(201).json({newNews})
    } catch (err) {
        res.status(404).json({message: `invalid create news`})
    }
}
export const getAllNews = async (req, res) => {
    const {page} = req.query
    try {
        const limit = 6;
        const startIndex = (+page - 1) * limit;
        const total = await newsModal.countDocuments({});
        const news = await newsModal.find().limit(limit).skip(startIndex);
        res.json({
            data: news,
            currentPage: +page,
            totalNews: total,
            numberOfPages: Math.ceil(total / limit),
        });
    } catch (err) {
        res.status(404).json({message: `something wrong with all news`})
    }
}
export const getNews = async (req, res) => {
    const {id} = req.params
    try {
        newsModal.findOneAndUpdate({_id: id},
            {$inc: {viewsCount: 1}},
            {returnDocument: 'after'},
            (err, doc) => {
                if (err) return res.json({message: `i cannot back  article, err:${err}`})
                if (!doc) return res.status(404).json({message: 'article not found here'})
                res.json(doc)
            })
    } catch (err) {
        res.status(500).json({message: 'failed found one post'})
    }
}


export const deleteNews = async (req, res) => {
    const {id} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No news exist with id : ${id}`})
        await newsModal.findByIdAndRemove(id)
        res.json({message: `Your news deleted successfully`})
    } catch (err) {
        res.status(404).json({message: `your news deleted is not correct`})
    }
}


export const updateNews = async (req, res) => {
    const {id} = req.params
    const {title, description, imageUrl, tags} = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: ` no news exist with id : ${id}`})
        const updateTour = {title, description, tags: tags.split(','), imageUrl, _id: id}
        await newsModal.findByIdAndUpdate(id, updateTour, {new: true})
        res.json(updateTour)
    } catch (err) {
        res.status(404).json({message: `updateNews, this is catch : ${err}`})

    }
}

export const getNewsByUser = async (req, res) => {
    const {id} = req.params
    const {page} = req.query
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "User doesn't exist"})
        const limitByUser = 6;
        const startIndexByUser = (+page - 1) * limitByUser;
        const totalByUser = await newsModal.countDocuments({creator: id});
        const data = await newsModal.find({creator: id}).limit(limitByUser).skip(startIndexByUser);
        const options = {
            currentPage: +page,
            totalNews: totalByUser,
            numberOfPages: Math.ceil(totalByUser / limitByUser),
        }
        res.status(200).json({data, options});
    } catch (err) {
        res.status(404).json({message: ` getNewsByUser , this is catch, err:${err}`})
    }
}

export const searchNews = async (req, res) => {
    const {searchQuery} = req.query;
    console.log(searchQuery)

    try {
        const title = new RegExp(searchQuery, "i");
        const news = await newsModal.find({title});
        res.json(news);
    } catch (error) {
        res.status(404).json({message: "searchNews, this is catch"});
    }
}

export const newsByTag = async (req, res) => {
    const {tag} = req.params
    try {
        const news = await newsModal.find({tags: {$in: tag}})
        res.json(news)
    } catch (err) {
        res.status(404).json({message: `newsByTag, this is catch, err: ${err}`});
    }
}

export const relatedNews = async (req, res) => {
    const {tags} = req.body
    try {
        const news = await newsModal.find({tags: {$in: tags}})
        res.json(news)
    } catch (err) {
        res.status(404).json({message: `relatedNews, this is catch, err: ${err}`});
    }
}

export const likeNews = async (req, res) => {
    const {id} = req.params;
    try {
        if (!req.userId) return res.json({message: "User is not authenticated"});
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No news exist with id: ${id}`});
        const news = await newsModal.findById(id);
        const index = news.likes.findIndex((id) => id === String(req.userId));
        index === -1 ? news.likes.push(req.userId) : news.likes = news.likes.filter((id) => id !== String(req.userId));
        const updatedNews = await newsModal.findByIdAndUpdate(id, news, {new: true,});
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(404).json({message: `likeNews,this is catch, err: ${error.message}`});
    }
}

export const findNewsByLikesId = async (req, res) => {
    const {like} = req.params
    try {
        const likes = await newsModal.find({likes: {$in: like}})
        res.json(likes)
    } catch (err) {
        res.status(404).json({message: `find likeNews,this is catch, err: ${error.message}`});

    }
}
export const findMyTags = async (req, res) => {
    const {id} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No news exist with id: ${id}`});
        const findTags = await newsModal.find({creator: id})
        const tag = Object.values(findTags).map(item => item.tags).flat()
        res.json(tag)
    } catch (err) {
        res.status(404).json({message: `find tags,this is catch, err: ${error.message}`});

    }
}