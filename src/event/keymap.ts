import { Action, actions } from "./actions";

// order is important for bitwise operations of active modifiers state
export enum Modifiers {
  None,
  Shift,
  Option,
  Edit,
  OptionShift,
  EditShift,
  EditOption,
  EditOptionShift,
}
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
  H: actions.moveValueLeft,
  J: actions.moveValueDown,
  K: actions.moveValueUp,
  L: actions.moveValueRight,
};
