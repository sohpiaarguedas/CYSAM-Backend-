import { Router } from 'express';
import { z } from 'zod';
import db from '../db/conection';
import { articles } from '../db/schema';
import { validateParams } from '../middleware/validations';
import { getArticleById, getArticles } from '../controllers/articlesController';

const getArticleSchema = z.object({
    id: z.string()
});

const router = Router();

router.get('/', getArticles);

router.get('/:id', validateParams(getArticleSchema), getArticleById);

export default router;