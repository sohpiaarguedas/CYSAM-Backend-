import {Router} from 'express';


const articles = require('../data/articles.json');

const router = Router();

router.get("/",(req, res) => {
    res.status(200).json({ articles });
})




export default router;