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
  // TODO: Define where a cursor position can be.
  position: Object;
};

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
  instruments: any[];
};

type Song = {
  chains: Chain[];
};

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
