import type { Request, Response } from "express";
import {db} from '../db/conection';
import {articles} from '../db/schema';
import { eq } from "drizzle-orm";

export const getArticles = async (req: Request, res: Response) => {
    try {
        const allArticles = await db.select().from(articles);
        res.status(200).json(allArticles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getArticleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (Array.isArray(id)) {
        return res.status(400).json({ message: 'Invalid article id' });
    }

    try {
        const [article] = await db.select().from(articles).where(eq(articles.id, id));
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}