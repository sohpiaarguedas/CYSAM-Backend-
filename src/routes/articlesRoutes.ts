import { Router } from 'express';
import { z } from 'zod';
import db from '../db/conection';
import { articles } from '../db/schema';
import { validateBody, validateParams } from '../middleware/validations';
import { getArticleById, getArticles, createArticle } from '../controllers/articlesController';
import { authenticateToken } from '../middleware/auth';
import { authorizeRole } from '../middleware/authorizeRole';

const getArticleSchema = z.object({
    id: z.string()
});

const getCreateArticle = z.object({
    title: z.string(),
    summary: z.string(),
    media_url: z.string(),
    media_type: z.string(),
    link_preview: z.string(),
    link_Image_Preview:z.string(),


})

const router = Router();

router.get('/', getArticles);

router.get('/:id', validateParams(getArticleSchema), getArticleById);

router.post('/create', authenticateToken, authorizeRole(["admin"]), validateBody(getCreateArticle), createArticle)



export default router;