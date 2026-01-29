import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./rbelby/events" }),
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

export const collections = { events };
