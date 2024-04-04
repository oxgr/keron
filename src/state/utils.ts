import { Chain, Line, Phrase, Track } from "../types";
import { useModel } from "./model";

const { model } = useModel();

export function getTrack(id: number) {
  return model.project.bank.tracks[id];
}

export function getChain(id: number) {
  return model.project.bank.chains[id];
}

export function getPhrase(id: number) {
  return model.project.bank.phrases[id];
}

export function getLine(id: number, phraseId: number) {
  return model.project.bank.phrases[phraseId].lines[id];
}

export function getActiveTrack(): Track {
  return getTrack(model.project.active.track);
}

export function getActiveChain(): Chain {
  return getChain(model.project.active.chain);
}

export function getActivePhrase(): Phrase {
  return getPhrase(model.project.active.phrase);
}

export function getActiveLine(): Line {
  return getLine(model.project.active.line, model.project.active.phrase);
}
