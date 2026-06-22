import type { CollectionEntry } from "astro:content";

export const site = {
  title: "yllan's stories",
  description: "Live stories of yllan",
  url: "https://yllan.org",
};

export type Lang = "en" | "zh";

export function softwareLang(app: CollectionEntry<"software">): Lang {
  return app.data.lang;
}

export function softwareSlug(app: CollectionEntry<"software">): string {
  // 用顯示名稱當 URL slug，保留 camelCase（glob loader 的 id 會被轉小寫）。
  // 與語言無關：同一個 app 的 en/zh 共用同一個 slug。
  return app.data.name;
}

// 英文為預設（無前綴），中文加 /zh/ 前綴。
export function softwareUrlFor(slug: string, lang: Lang): string {
  return lang === "zh" ? `/zh/software/${slug}/` : `/software/${slug}/`;
}

export function softwareIndexUrl(lang: Lang): string {
  return lang === "zh" ? "/zh/software/" : "/software/";
}

export function softwareUrl(app: CollectionEntry<"software">): string {
  return softwareUrlFor(softwareSlug(app), softwareLang(app));
}

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
