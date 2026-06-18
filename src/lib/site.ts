import type { CollectionEntry } from "astro:content";

export const site = {
  title: "yllan's stories",
  description: "Live stories of yllan",
  url: "https://yllan.org",
};

export function storyDate(story: CollectionEntry<"stories">): string {
  return story.data.date.toISOString().slice(0, 10);
}

export function storyUrl(story: CollectionEntry<"stories">): string {
  return `/stories/${storyDate(story)}/${story.data.slug}/`;
}

export function formatListDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

export function groupStoriesByYear(stories: CollectionEntry<"stories">[]) {
  const groups = new Map<string, CollectionEntry<"stories">[]>();

  for (const story of stories) {
    const year = storyDate(story).slice(0, 4);
    if (!groups.has(year)) {
      groups.set(year, []);
    }
    groups.get(year)?.push(story);
  }

  return [...groups.entries()];
}
