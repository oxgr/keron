import {
  Chain,
  ChainId,
  InstrumentId,
  Line,
  Phrase,
  PhraseId,
  Track,
} from "../types";
import { useModel } from "./model";

const { model } = useModel();

export function getTrack(id: number) {
  return model.project.song.tracks[id];
}

export function getChain(id: ChainId) {
  return model.project.bank.chains[id];
}

export function getPhrase(id: PhraseId) {
  return model.project.bank.phrases[id];
}

export function getLine(id: number, phraseId: PhraseId) {
  return model.project.bank.phrases[phraseId].lines[id];
}

export function getInstrument(id: InstrumentId) {
  return model.project.bank.instruments[id];
}

export function getActiveTrack(): Track {
  return getTrack(model.view.active.track);
}

export function getActiveChain(): Chain {
  return getChain(model.view.active.chain);
}

export function getActivePhrase(): Phrase {
  return getPhrase(model.view.active.phrase);
}

export function getActiveLine(): Line {
  return getLine(model.view.active.line, model.view.active.phrase);
}

export function getActiveInstrument(): Line {
  return getLine(model.view.active.line, model.view.active.phrase);
}
