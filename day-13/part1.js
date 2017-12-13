"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
let i = 0;
const input = readInput(path.join(__dirname, "./input.txt"));
const layerStateArray = parseInput(input);
// console.log(layerStateArray);
main();
function main() {
    let state = {
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
function readInput(file) {
    const textFile = fs.readFileSync(file, {
        encoding: "utf8"
    });
    return textFile;
}
function parseInput(fileContent) {
    const rows = fileContent.split("\n");
    const rangeArray = [];
    rows.forEach(r => {
        const { depth, range } = parseRow(r);
        rangeArray[depth] = range;
    });
    return rangeArray.map(range => {
        return range ? { range: range, velocity: -1, scannerPos: 0 } : undefined;
    });
}
function parseRow(r) {
    const parts = r.split(":");
    return {
        depth: parseInt(parts[0], 10),
        range: parseInt(parts[1], 10)
    };
}
function rootReducer(state, action) {
    switch (action.type) {
        case "movePacket": {
            const newPacketPos = state.packetAtLayerPos + 1;
            const newLayer = state.layers[newPacketPos];
            const punishment = newLayer && newLayer.scannerPos === 0
                ? newPacketPos * newLayer.range
                : 0;
            // console.log(punishment);
            return Object.assign({}, state, { packetAtLayerPos: newPacketPos, punishment: state.punishment + punishment });
        }
        case "moveScanner":
            const newArray = state.layers.map(v => v && layerReducer(v, action));
            return Object.assign({}, state, { layers: newArray });
        default:
            return state;
    }
}
function layerReducer(state, action) {
    switch (action.type) {
        case "moveScanner":
            const newVelocity = state.scannerPos >= state.range - 1 || state.scannerPos === 0
                ? -state.velocity
                : state.velocity;
            return Object.assign({}, state, { scannerPos: state.scannerPos + newVelocity, velocity: newVelocity });
        default:
            return state;
    }
}
