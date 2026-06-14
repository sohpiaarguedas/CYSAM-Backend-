import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const articles = pgTable('articles', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    summary: text('summary').notNull(),
    media_url: text('media_url').notNull(),
    media_type: text('media_type').notNull(),
    link_url: text('link_url').notNull(),
    link_preview:text('link_preview').notNull(),
    link_Image_Preview:text('linkImagePreview').notNull(),
    button_text: text('button_text').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull()

 
    
});