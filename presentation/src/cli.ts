#!/usr/bin/env node
import { createRequire } from "module";
import { generatePairwise, parseValues, type Param } from "./pairwise.js";

const require = createRequire(import.meta.url);
const pkg = require("../../package.json");

const args = process.argv.slice(2);

if (args.includes("--version") || args.includes("-v")) {
  console.log(pkg.version);
  process.exit(0);
}

if (args.includes("--help") || args.includes("-h")) {
  console.log(`pairwise v${pkg.version}
Usage: pairwise [options] <param>=<values>...

Options:
  -v, --version  Print version number
  -h, --help     Show this help message

Example:
  pairwise Browser=Chrome,Firefox OS=Windows,Mac Auth=OAuth,Password`);
  process.exit(0);
}

if (args.length === 0) {
  console.error("Error: No parameters provided. Use --help for usage.");
  process.exit(1);
}

const params: Param[] = args.map((arg) => {
  const eq = arg.indexOf("=");
  if (eq === -1) {
    console.error(`Error: Invalid parameter "${arg}". Expected format: Name=val1,val2`);
    process.exit(1);
  }
  const name = arg.slice(0, eq);
  const values = parseValues(arg.slice(eq + 1));
  if (values.length === 0) {
    console.error(`Error: Parameter "${name}" has no values.`);
    process.exit(1);
  }
  return { name, values };
});

const tests = generatePairwise(params);
const header = params.map((p) => p.name).join("\t");
console.log(header);
for (const row of tests) {
  console.log(row.join("\t"));
}
