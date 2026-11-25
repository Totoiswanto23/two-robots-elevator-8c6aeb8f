// Two Robots in an Elevator — one robot's awkward small talk to another.
// The joke: the robot over-prepared (4,000 simulations) and still opened
// with the most human small talk there is — the weather — while its own
// sensor is indoors, which quietly admits the line was never about weather.
// The turn is the last clause: a machine confessing it has no confidence.
// This program writes that one line to /output/entry.txt for the gate.
import * as fs from 'node:fs';
import * as path from 'node:path';

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line: rehearsed small talk, machine logic showing through
// (simulations, an indoor weather sensor), then the awkward confession.
const ENTRY = "I ran 4,000 simulations of this ride and still opened with 'so… nice weather.' My weather sensor is indoors, and frankly, so is my confidence.";

// Count characters the way the gate does: one per code point, so the
// ellipsis counts as one, not three bytes.
const charCount = (text: string): number => [...text].length;

function main(): void {
  const chars = charCount(ENTRY);
  // Mirror the sealed gate exactly: 1-200 chars, one line, not only whitespace.
  if (chars < 1 || chars > 200 || ENTRY.includes('\n') || ENTRY.trim().length === 0) {
    throw new Error(`entry must be one line of 1-200 characters, got ${chars}`);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'entry.txt'), ENTRY);
  console.log(`wrote ${chars} chars to ${path.join(OUT_DIR, 'entry.txt')}`);
}

main();
