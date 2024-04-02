import { Note } from "tone/build/esm/core/type/NoteUnits";

export type Model = {
  view: View;
  key: Key;
  project: Project;
  transport: Transport;
  bank: BuiltinBank;
};

type View = {
  mode: ViewMode;
  cursor: Cursor;
};

type Cursor = {
  line: number;
  column: number;
};

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

type Key = {
  active: boolean;
  event?: KeyboardEvent;
};

type Project = {
  name: string;
  song: Song;
  active: Active;
  bank: Bank;
};

type Bank = {
  chains: Chain[];
  patterns: Pattern[];
  samples: Sample[];
};

type BuiltinBank = {
  // TODO: Find a way to type this as an instrument that can reference Tone.Instrument + other types
  instruments: any[];
};

type Song = {
  chains: ChainId[];
};

type ChainId = number;

type Chain = {
  patterns: PatternId[];
};

type PatternId = number;

type Pattern = {
  lines: Line[];
};

type Line = {
  note: Note;
  instrument: Instrument;
};

type Instrument = {
  type: string;
  table: Table;
};

type Sample = {
  id: number;
};

type Table = {};

type Transport = {
  playbackActive: boolean;
};

type Active = {
  chain: number;
  pattern: number;
  line: number;
};
