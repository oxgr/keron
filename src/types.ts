import { SetStoreFunction } from "solid-js/store";
import { AudioModel, InstrumentTypes } from "./audio/types";
import { Model } from "./state/Model";

export type StoreTuple = [Model | AudioModel, SetStoreFunction<any>];

export type View = {
  mode: ViewMode;
  cursor: GridPosition;
  playhead: Active;
  active: Active;
  lineRange: number[];
};

export type GridPosition = {
  line: number;
  column: number;
};

export type CursorTrack = keyof GridPosition;

export enum YDirection {
  Down = -1,
  Up = 1,
}

export enum XDirection {
  Left = 2,
  Right = 3,
}

export type ValueDirection = YDirection;
export const ValueDirection = { ...YDirection } as const;

export type Direction = XDirection | YDirection | 0;
export const Direction = { ...XDirection, ...YDirection, Neutral: 0 } as const;

export const XDirectionMap = {
  [Direction.Left]: Direction.Down,
  [Direction.Right]: Direction.Up,
} as const;

export enum ViewMode {
  Configuration,
  Project,
  Song,
  Chain,
  Phrase,
  Instrument,
  Table,
}

export enum PhraseViewColumn {
  Note,
  Velocity,
  Instrument,
  FX1,
  FX2,
  FX3,
}

export type Key = {
  active: boolean;
  event?: KeyboardEvent;
};

export type Active = {
  track: number;
  chain: number;
  phrase: number;
  line: number;
  instrument: number;
};

export type Project = {
  name: string;
  song: Song;
  bank: Bank;
};

export type Bank = {
  chains: Chain[];
  phrases: Phrase[];
  samples: Sample[];
  instruments: Instrument[];
};

export type Song = {
  tracks: Track[];
};

export type Track = {
  chains: ChainId[];
};

export type ChainId = number;
export type Chain = {
  phrases: PhraseId[];
};

export type PhraseId = number;
export type Phrase = {
  lines: Line[];
};

export type Line = {
  note: Note;
  // accidental: Accidental;
  octave: Octave;
  velocity: Velocity;
  instrument: InstrumentId;
  fx1: LineFx;
  fx2: LineFx;
  fx3: LineFx;
};

export type LineFx = {
  id: LineFxId;
  val: number;
};

export type LineFxId = number;

export enum LineFxRange {
  Low = 0,
  High = 127,
}

export type Velocity = number;

export type InstrumentId = number;
export type Instrument = {
  type: InstrumentTypes;
  table: Table;
};

export type Sample = {
  id: number;
};

export type Table = {};

export type Note = (typeof NOTES)[number];
// export type Accidental = (typeof ACCIDENTALS)[number];
export type Octave = (typeof OCTAVES)[number];

export const NOTES = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
] as const;
// export const ACCIDENTALS = ["", "b", "#", "x"] as const;
export const OCTAVES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
