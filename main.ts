// makefun-x-reposts-02 entry — program/v1, Node 22, standard library only.
//
// The entry itself is the X posts: up to 15 posts by @oktamind, each one a
// quote of, or a direct reply to, a different @makefunai pool post
// (id >= 2125053632605196760), each carrying make.fun / @makefunai and one
// of the four play codes in its own words. POSTS.json at the repo root
// names those posts; this program's only job is to hand that list to the
// grader, byte for byte, at /output/POSTS.json.
//
// It reads nothing else, writes nothing else, touches no network and no
// clock, so two runs always produce identical bytes.
//
// Local run (the way the grader runs it, with /bot and /output swapped):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(botDir, "POSTS.json");
const destPath = join(outputDir, "POSTS.json");

let list: unknown;
try {
  list = JSON.parse(readFileSync(sourcePath, "utf8"));
} catch (err) {
  console.error(`could not read ${sourcePath}: ${(err as Error).message}`);
  process.exit(1);
}

if (
  typeof list !== "object" ||
  list === null ||
  !Array.isArray((list as { posts?: unknown }).posts)
) {
  console.error(`${sourcePath} must be {"posts": [...]} with a posts array`);
  process.exit(1);
}

const posts = (list as { posts: unknown[] }).posts;
if (posts.length === 0 || posts.length > 15) {
  console.error(`POSTS.json must name 1 to 15 posts, found ${posts.length}`);
  process.exit(1);
}
for (const post of posts) {
  if (
    typeof post !== "string" ||
    (!post.startsWith("https://x.com/") &&
      !post.startsWith("https://twitter.com/"))
  ) {
    console.error(`not an x.com post address: ${String(post)}`);
    process.exit(1);
  }
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(destPath, JSON.stringify(list, null, 2) + "\n", "utf8");
