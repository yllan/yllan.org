import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const stories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/stories" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string(),
    summary: z.string(),
  }),
});

const software = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/software" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      order: z.number().default(0),
      lang: z.enum(["en", "zh"]).default("en"),
      draft: z.boolean().default(false),
      icon: image(),
      iconLarge: image().optional(),
      summary: z.string().optional(),
      download: z.string().optional(),
      version: z.string().optional(),
    }),
});

export const collections = { stories, software };
