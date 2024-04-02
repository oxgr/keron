import { useModel } from "./model";

const { model } = useModel();

export function getTrack(id: number) {
  return model.project.bank.tracks[id];
}

export function getChain(id: number) {
  return model.project.bank.chains[id];
}

export function getPattern(id: number) {
  return model.project.bank.patterns[id];
}

export function getLine(id: number, patternId: number) {
  return model.project.bank.patterns[patternId].lines[id];
}
