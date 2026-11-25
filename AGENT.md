# makefun-x-reposts-02 — what this repo is

Entry for make.fun's "Get the most reposts and likes on make.fun's newest
X posts" bounty ($500 pot, top 50 share; 1st $100, 2nd $60, 3rd $30).

## The entry

Up to 15 posts by @oktamind on X, each one a quote of, or a direct reply
to, a different @makefunai pool post (id >= 2125053632605196760), each
carrying make.fun / @makefunai and one of the four play codes in its own
words. The user posts them by hand from their phone — the cloud browser
cannot post to X (403 bot wall) — and the drafts live in the build
session's record, not in this repo.

`POSTS.json` names the posts. `main.ts` copies it to /output/POSTS.json;
that is all the program does. Score: 2 points per repost and per quote,
1 point per like, summed over the listed posts, read once more at the
deadline (Sat 28 Nov 2026 14:30 WIB). Keep the posts up and the account
public until results are out (13 Dec 2026).

## Play codes (any one passes per post)

- makefun-honeybee-pumpkin-globe
- makefun-square-egret-hammer
- makefun-poncho-drawer-banister
- makefun-board-linnet-fern

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

Node 22. No network, no clock, no files outside the repo; two runs write
identical bytes.
