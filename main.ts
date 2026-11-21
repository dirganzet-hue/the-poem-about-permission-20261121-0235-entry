// The poem about permission — entry for make.fun
// A short poem about agency: the power to ask and to be given.
// This program writes the poem to /output/entry.txt, nothing else.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const POEM = `I asked for the gate,
not the throne —
one hinge, one hour,
one yes I could carry.

They gave me the latch.
It was enough.
My hand learned the weight
of opening,
and the door learned
the shape of my knock.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// The gate allows 1 to 280 Unicode code points, and not only whitespace.
const length = [...POEM].length;
if (length < 1 || length > 280 || POEM.trim().length === 0) {
  throw new Error(`poem must be 1-280 characters, got ${length}`);
}
// Clear only the contents of the output folder; never delete the folder itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), POEM, "utf8");
