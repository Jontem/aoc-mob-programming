import * as fs from "fs";
import * as path from "path";

interface RootState {
  readonly layers: ReadonlyArray<LayerState | undefined>;
  readonly packetAtLayerPos: number;
  readonly punishment: number;
}

interface MoveScannerAction {
  readonly type: "moveScanner";
}

interface MovePacketAction {
  readonly type: "movePacket";
}

type Action = MoveScannerAction | MovePacketAction;

interface LayerState {
  readonly scannerPos: number;
  readonly range: number;
}

const input: string = readInput(path.join(__dirname, "./input.txt"));
const array = parseInput(input);

console.log(array);

let state: RootState = {
  layers: array,
  packetAtLayerPos: 0,
  punishment: 0
};
for (let i = 0; i < array.length; i++) {
  state = rootReducer(state, {
    type: "movePacket"
  });
  state = rootReducer(state, {
    type: "moveScanner"
  });
}

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

function rootReducer(state: RootState, action: Action): RootState {
  switch (action) {
    default:
      return state;
  }
}

function layerReducer(state: LayerState, action: Action): LayerState {
  switch (action) {
    default:
      return state;
  }
}
