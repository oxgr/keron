import { Note } from "tone/build/esm/core/type/NoteUnits";

export type Model = {
  view: View;
  key: Key;
  project: Project;
};

export enum View {
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
};

type Song = {
  chains: Chain[];
};

type Chain = {
  patterns: Pattern[];
};

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

type Table = {};
