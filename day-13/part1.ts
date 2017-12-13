import * as fs from "fs";

const textFile = fs.readFileSync("./input.txt", { encoding: "utf8" });

const rows = textFile.split("\n");

const array: Array<number> = [];

rows.forEach(r => {
  const { depth, range } = parseRow(r);
  array[depth] = range;
});

console.log(array);

function parseRow(r: string) {
  const parts = r.split(":");
  const depth = parseInt(parts[0], 10);
  const range = parseInt(parts[1], 10);

  return { depth, range };
}
