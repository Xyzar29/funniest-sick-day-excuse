// The Funniest Sick-Day Excuse — entry program.
//
// Writes exactly one line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt) and checks the gate itself:
// the text must be 1 to 200 characters, a single line, and
// more than just whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: a sneeze violent enough to throw a back out is
// half believable, fresh (no fever, no dog, no dead grandma),
// and the punch lands on the last words — "a sign from the
// universe" is the line the office would quote back.
const LINE =
  "Sorry, can't come in — I sneezed so hard I threw my back out, and honestly, if that's not a sign from the universe, I don't know what is.";

// Gate check: count characters as code points, the way the
// sealed scorer measures the file.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1-200`);
}
if (/[\n\r]/.test(LINE) || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote entry.txt (${chars} characters, 1 line)`);
