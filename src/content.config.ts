import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const classes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/classes' }),
  schema: z.object({
    title: z.string(),
    title_zh: z.string().optional(),
    hashtag: z.string(),               // e.g. "#無基礎tango"
    group: z.string(),                 // e.g. "學習小組"
    summary: z.string(),
    summary_zh: z.string().optional(),
    fee_hkd: z.number().optional(),    // for JSON-LD Course
    duration_min: z.number().default(60),
    dress_code: z.string().optional(),
    schedule_url: z.string().optional(),
    order: z.number().default(0),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    role: z.string().default('Founders'),
    summary: z.string(),
    photo: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { classes, team };
