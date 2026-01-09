import { defineCollection, z } from 'astro:content';

import { glob, file } from 'astro/loaders';

const blog = defineCollection({ /* ... */ });
const dogs = defineCollection({ /* ... */ });

// loader
// schema / zod

export const collections = { blog, dogs };
