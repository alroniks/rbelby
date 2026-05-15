import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './rbelby/events' }),
  schema: z.object({
    name: z.string(),
    date: z.coerce.date(),
    distance: z.number(),
    type: z.string().optional(),
    club: z.string().optional(),
    startLocation: z.string().optional(),
    organizer: z.string().optional(),
  }),
});

const routes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './rbelby/routes' }),
  schema: z.object({
    name: z.string(),
    distance: z.number(),
    startLocation: z.string().optional(),
    endLocation: z.string().optional(),
    type: z.string().optional(),
    club: z.string().optional(),
  }),
});

const clubs = defineCollection({
  loader: file('./rbelby/data/clubs.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    city: z.string().optional(),
    site: z.string().optional(),
    email: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: file('./rbelby/data/authors.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().optional(),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './rbelby/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { events, routes, clubs, authors, journal };
