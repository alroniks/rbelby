import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const seoSchema = z.object({
  seoTitle: z.string().optional().catch(undefined),
  seoDescription: z.string().optional().catch(undefined),
  ogImage: z.string().optional().catch(undefined),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './rbelby/events' }),
  schema: z
    .object({
      name: z.string().catch('Unnamed Event'),
      date: z.coerce.date().catch(() => new Date(0)),
      distance: z.number().catch(0),
      type: z.string().optional().catch(undefined),
      club: z.string().optional().catch(undefined),
      startLocation: z.string().optional().catch(undefined),
      organizer: z.string().optional().catch(undefined),
    })
    .merge(seoSchema),
});

const routes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './rbelby/routes' }),
  schema: z
    .object({
      name: z.string().catch('Unnamed Route'),
      distance: z.number().catch(0),
      startLocation: z.string().optional().catch(undefined),
      endLocation: z.string().optional().catch(undefined),
      type: z.string().optional().catch(undefined),
      club: z.string().optional().catch(undefined),
    })
    .merge(seoSchema),
});

const clubs = defineCollection({
  loader: file('./rbelby/data/clubs.json'),
  schema: z.object({
    id: z.string().catch('unknown'),
    name: z.string().catch('Unnamed Club'),
    description: z.string().optional().catch(undefined),
    createdAt: z.string().optional().catch(undefined),
    updatedAt: z.string().optional().catch(undefined),
    city: z.string().optional().catch(undefined),
    site: z.string().optional().catch(undefined),
    email: z.string().optional().catch(undefined),
  }),
});

const authors = defineCollection({
  loader: file('./rbelby/data/authors.json'),
  schema: z.object({
    id: z.string().catch('unknown'),
    name: z.string().catch('Unnamed Author'),
    email: z.string().optional().catch(undefined),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './rbelby/journal' }),
  schema: z
    .object({
      title: z.string().catch('Untitled Post'),
      date: z.coerce.date().catch(() => new Date(0)),
      author: z.string().optional().catch(undefined),
      tags: z.array(z.string()).optional().catch(undefined),
    })
    .merge(seoSchema),
});

export const collections = { events, routes, clubs, authors, journal };
