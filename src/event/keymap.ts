import { Action, actions } from "./actions";

export enum InputMode {
  Normal,
  Insert,
  Visual,
}

// order is important for bitwise operations of active modifiers state
export enum Modifiers {
  Shift = 1,
  Option = 2,
  Edit = 4,
}

export type Keymap = {
  modifiers: Record<Modifiers, KeyboardEvent["code"]>;
  global: Record<string, Action>;
  normal: Record<string, Action>;
  insert: Record<string, Action>;
  visual: Record<string, Action>;
  delete: Record<string, Action>;
};

/**
 * Map of keyboard keys and the respective actions they trigger
 */
export const DEFAULT_KEYMAP: Keymap = {
  modifiers: {
    [Modifiers.Shift]: "Shift",
    [Modifiers.Option]: "f",
    [Modifiers.Edit]: "d",
  },
  global: {
    "<Space>": actions.togglePlaybackPhrase,
    "<Enter>": actions.togglePlaybackSong,
    "Shift-p": actions.printTime,
    "<Backspace>": actions.playDefaultNote,
    ",": actions.prevViewMode,
    ".": actions.nextViewMode,
    h: actions.moveCursorLeft,
    j: actions.moveCursorDown,
    l: actions.moveCursorRight,
    k: actions.moveCursorUp,
    "S-h": actions.moveValueLeft,
    "S-j": actions.moveValueDown,
    "S-k": actions.moveValueUp,
    "S-l": actions.moveValueRight,
    "SO-i": actions.moveValueRight,
  },
  normal: {},
  insert: {},
  visual: {},
  delete: {},
} as const;
