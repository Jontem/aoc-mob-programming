import * as fs from "fs";
import * as path from "path";

let i = 0;

interface MoveScannerAction {
  readonly type: "moveScanner";
}

interface MovePacketAction {
  readonly type: "movePacket";
}

type Action = MoveScannerAction | MovePacketAction;

interface RootState {
  readonly layers: ReadonlyArray<LayerState | undefined>;
  readonly packetAtLayerPos: number;
  readonly punishment: number;
}

interface LayerState {
  readonly scannerPos: number;
  readonly range: number;
  readonly velocity: number;
}

const input: string = readInput(path.join(__dirname, "./input.txt"));
const layerStateArray = parseInput(input);

// console.log(layerStateArray);

main();

function main() {
  let state: RootState = {
    layers: layerStateArray,
    packetAtLayerPos: 0,
    punishment: 0
  };
  console.log(i++, state);
  for (let i = 0; i < layerStateArray.length; i++) {
    state = rootReducer(state, {
      type: "movePacket"
    });
    state = rootReducer(state, {
      type: "moveScanner"
    });
    console.log(i++, state);
  }
  console.log(state.punishment);
}
function readInput(file: string): string {
  const textFile = fs.readFileSync(file, {
    encoding: "utf8"
  });
  return textFile;
}

function parseInput(fileContent: string): Array<LayerState | undefined> {
  const rows = fileContent.split("\n");
  const rangeArray: Array<number> = [];
  rows.forEach(r => {
    const { depth, range } = parseRow(r);
    rangeArray[depth] = range;
  });

  return rangeArray.map(range => {
    return range ? { range: range, velocity: -1, scannerPos: 0 } : undefined;
  });
}

function parseRow(r: string) {
  const parts = r.split(":");
  return {
    depth: parseInt(parts[0], 10),
    range: parseInt(parts[1], 10)
  };
}

function rootReducer(state: RootState, action: Action): RootState {
  switch (action.type) {
    case "movePacket": {
      const newPacketPos = state.packetAtLayerPos + 1;
      const newLayer = state.layers[newPacketPos];
      const punishment =
        newLayer && newLayer.scannerPos === 0
          ? newPacketPos * newLayer.range
          : 0;
      // console.log(punishment);
      return {
        ...state,
        packetAtLayerPos: newPacketPos,
        punishment: state.punishment + punishment
      };
    }
    case "moveScanner":
      const newArray = state.layers.map(v => v && layerReducer(v, action));
      return { ...state, layers: newArray };
    default:
      return state;
  }
}

function layerReducer(state: LayerState, action: Action): LayerState {
  switch (action.type) {
    case "moveScanner":
      const newVelocity =
        state.scannerPos >= state.range - 1 || state.scannerPos === 0
          ? -state.velocity
          : state.velocity;
      return {
        ...state,
        scannerPos: state.scannerPos + newVelocity,
        velocity: newVelocity
      };
    default:
      return state;
  }
}
