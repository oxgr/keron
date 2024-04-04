import { Action, actions } from "./actions";

type Keymap = Record<string, Action>;

/**
 * Map of keyboard keys and the respective actions they trigger
 */
export const keymap: Keymap = {
  " ": actions.togglePlaybackPhrase,
  Enter: actions.togglePlaybackSong,
  p: actions.printTime,
  Backspace: actions.playDefaultNote,
  ",": actions.prevViewMode,
  ".": actions.nextViewMode,
  h: actions.moveCursorLeft,
  j: actions.moveCursorDown,
  l: actions.moveCursorRight,
  k: actions.moveCursorUp,
  J: actions.moveValueDown,
  K: actions.moveValueUp,
};
