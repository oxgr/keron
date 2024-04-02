import { Note } from "tone/build/esm/core/type/NoteUnits";

export type Model = {
  view: View;
  key: Key;
  project: Project;
  transport: Transport;
  bank: BuiltinBank;
};

export type View = {
  mode: ViewMode;
  cursor: Cursor;
};

export type Cursor = {
  line: number;
  column: number;
};

export type CursorTrack = keyof Cursor;

export enum CursorMoveDirection {
  Left,
  Down,
  Up,
  Right,
}

export enum ViewMode {
  Settings,
  Project,
  Song,
  Chain,
  Pattern,
  Instrument,
  Table,
}

export type Key = {
  active: boolean;
  event?: KeyboardEvent;
};

export type Project = {
  name: string;
  song: Song;
  active: Active;
  bank: Bank;
};

export type Bank = {
  tracks: Track[];
  chains: Chain[];
  patterns: Pattern[];
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
  patterns: PatternId[];
};

export type PatternId = number;
export type Pattern = {
  lines: Line[];
};

export type Line = {
  note: Note;
  instrument: Instrument;
};

export type Instrument = {
  type: string;
  table: Table;
};

export type Sample = {
  id: number;
};

export type Table = {};

export type Transport = {
  playbackActive: boolean;
};

export type Active = {
  chain: number;
  pattern: number;
  line: number;
};
