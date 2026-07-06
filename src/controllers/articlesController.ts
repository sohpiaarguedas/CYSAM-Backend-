import type { Request, Response } from "express";
import db from "../db/conection";
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
    const id = req.params.id as string;

    if (!id) {
        return res.status(400).json({ message: 'Invalid article id' });
    }

    try {
        const [article] = await db
            .select()
            .from(articles)
            .where(eq(articles.id, id));

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json(article);
    } catch (error) {
        console.error('Error fetching article by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const createArticle = async (req: Request, res: Response) => {
    try {
        const {
            title,
            summary,
            media_url,
            media_type,
            link_url,
            link_preview,
            link_Image_Preview,
          
        } = req.body;

        const [article] = await db.insert(articles).values({
                title,
                summary,
                media_url,
                media_type,
                link_url,
                link_preview,
                link_Image_Preview,
               
            })
            .returning();

        res.status(201).json(article);

    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!id) {
            return res.status(400).json({ message: 'Invalid article id' });
        }

        const [deletedArticle] = await db.delete(articles).where(eq(articles.id, id)).returning();

        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};