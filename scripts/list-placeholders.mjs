#!/usr/bin/env node
// Lists every TODO and bracketed placeholder ([Founder Name], [DD Mon YYYY], ...) still in the project.
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const targets = ["site.config.ts", "src", "public/images"];
const exts = /\.(tsx?|mdx|json|svg)$/;
const pattern = /TODO|\[(?:Founder Name|Firm|City|State|DD Mon YYYY|Grievance Officer Name|Office no\.[^\]]*|Street[^\]]*|000000|University|Sample[^\]]*|Insurer[^\]]*|IRDAI[^\]]*|Registered transaction platform[^\]]*|year|number|previous career)\]|PHOTO PLACEHOLDER|example\.com|Sample AMC/;

function walk(p) {
  const full = path.join(root, p);
  if (statSync(full).isDirectory()) return readdirSync(full).flatMap((f) => walk(path.join(p, f)));
  return exts.test(p) ? [p] : [];
}

let count = 0;
for (const file of targets.flatMap(walk)) {
  if (file.includes("list-placeholders")) continue;
  readFileSync(path.join(root, file), "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (pattern.test(line)) {
        count++;
        console.log(`${file}:${i + 1}: ${line.trim().slice(0, 140)}`);
      }
    });
}
console.log(`\n${count} placeholder lines found.`);
process.exitCode = 0;
