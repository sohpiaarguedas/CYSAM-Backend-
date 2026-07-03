import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: text('role').notNull().default('user'),

    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const articles = pgTable('articles', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    summary: text('summary').notNull(),
    media_url: text('media_url').notNull(),
    media_type: text('media_type').notNull(),
    //LAS CAMBIÉ POR ERROR QUE ME DABA AL DARLE EL PUSH A LA BD
    link_url: text('link_url').default(""),
    link_preview: text('link_preview').default(""),
    link_Image_Preview: text('linkImagePreview').default(""),
 
    //////////////////////////////////////////////////////////

    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull()
});