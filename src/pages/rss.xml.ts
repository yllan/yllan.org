import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site, storyUrl, storyDate } from "../lib/site";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const stories = await getCollection("stories");
  const sorted = stories.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? site.url,
    items: sorted.map((story) => ({
      title: story.data.title,
      pubDate: story.data.date,
      description: story.data.summary,
      link: storyUrl(story),
    })),
  });
}
