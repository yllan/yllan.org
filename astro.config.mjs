import { defineConfig } from "astro/config";

// 把 markdown 裡「自成一段的圖片」包成 <figure>。
// 圖說（figcaption）取自 markdown 圖片的 title（第三個參數），
// alt 則保留給無障礙用途：
//   ![替代文字](./foo.png "這裡是圖說")   → 有圖說
//   ![替代文字](./foo.png)                → 無圖說
// 外觀依所在容器決定（軟體頁 .mac-content 為照片風截圖、文章 .story-article 為一般插圖）。
function rehypeImageFigure() {
  return (tree) => {
    const visit = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (
          child.type === "element" &&
          child.tagName === "p" &&
          child.children.length === 1 &&
          child.children[0].type === "element" &&
          child.children[0].tagName === "img"
        ) {
          const img = child.children[0];
          const caption = img.properties?.title ?? "";
          const children = [img];
          if (caption) {
            children.push({
              type: "element",
              tagName: "figcaption",
              properties: {},
              children: [{ type: "text", value: caption }],
            });
            delete img.properties.title;
          }
          return {
            type: "element",
            tagName: "figure",
            properties: {},
            children,
          };
        }
        return child;
      });
      node.children.forEach(visit);
    };
    visit(tree);
  };
}

export default defineConfig({
  site: "https://yllan.org",
  output: "static",
  image: {
    // 讓 markdown 圖片自動產生多解析度 srcset（大圖也不會塞滿頻寬）
    layout: "constrained",
  },
  markdown: {
    rehypePlugins: [rehypeImageFigure],
  },
});
