import { Router } from 'express';
import { z } from 'zod';
import db from '../db/conection';
import { articles } from '../db/schema';
import { validateParams } from '../middleware/validations';

const getArticleSchema = z.object({
    id: z.string()
});

const router = Router();

router.get('/', async (req, res) => {
    try {
        const results = await db
            .select({
                id: articles.id,
                title: articles.title,
                summary: articles.summary,
                media_url: articles.media_url,
                media_type: articles.media_type,
                link_url: articles.link_url,
                link_preview: articles.link_preview,
                link_Image_Preview: articles.link_Image_Preview,
                button_text: articles.button_text,
                created_at: articles.created_at,
                updated_at: articles.updated_at,
            })
            .from(articles);

            
        const articlesList = results.map(row => ({
            id: row.id,
            title: row.title,
            summary: row.summary,
            media_url: row.media_url,
            media_type: row.media_type,
            link_url: row.link_url,
            link_preview: row.link_preview,
            link_Image_Preview: row.link_Image_Preview,
            button_text: row.button_text,
            created_at: row.created_at,
            updated_at: row.updated_at,

        }));

        res.status(200).json(articlesList);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', validateParams(getArticleSchema), async (req, res) => {



    res.status(200).json({ message: `Details of article with id ${req.params.id}` });
});

export default router;