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

export function getActiveTrack() {
  return getChain(model.project.active.track);
}

export function getActiveChain() {
  return getChain(model.project.active.chain);
}

export function getActivePattern() {
  return getPattern(model.project.active.pattern);
}

export function getActiveLine() {
  return getPattern(model.project.active.line);
}
