import * as fs from "fs";
import * as path from "path";

interface LayerState {
  readonly scannerPos: number;
  readonly depth: number;
}

const input: string = readInput(path.join(__dirname, "./input.txt"));
const array = parseInput(input);

console.log(array);

function readInput(file: string): string {
  const textFile = fs.readFileSync(file, {
    encoding: "utf8"
  });
  return textFile;
}

function parseInput(fileContent: string): ReadonlyArray<number | undefined> {
  const rows = fileContent.split("\n");
  const array: Array<number> = [];
  rows.forEach(r => {
    const { depth, range } = parseRow(r);
    array[depth] = range;
  });
  return array;
}

function parseRow(r: string) {
  const parts = r.split(":");
  return {
    depth: parseInt(parts[0], 10),
    range: parseInt(parts[1], 10)
  };
}
