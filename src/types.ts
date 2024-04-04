// import { Note } from "tone/build/esm/core/type/NoteUnits";

export type Model = {
  view: View;
  key: Key;
  project: Project;
  transport: Transport;
  bank: BuiltinBank;
};

export type View = {
  mode: ViewMode;
  cursor: GridPosition;
  playhead: GridPosition;
  active: Active;
  lineRange: number[];
};

export type GridPosition = {
  line: number;
  column: number;
};

export type CursorTrack = keyof GridPosition;

export enum Direction {
  Down = -1,
  Neutral = 0,
  Up = 1,
  Left = 2,
  Right = 3,
}

export const InlineDirection = {
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
};

export type Project = {
  name: string;
  song: Song;
  bank: Bank;
};

export type Bank = {
  tracks: Track[];
  chains: Chain[];
  phrases: Phrase[];
  samples: Sample[];
};

export type BuiltinBank = {
  // TODO: Find a way to type this as an instrument that can reference Tone.Instrument + other types
  instruments: any[];
};

export type Song = {
  tracks: TrackId[];
};

export type TrackId = number;
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
  instrument: Instrument;
};

export type Velocity = number;

export type Instrument = {
  id: number;
  table: Table;
};

export type Sample = {
  id: number;
};

export type Table = {};

export type Transport = {
  playbackActive: boolean;
};

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
export const OCTAVES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
