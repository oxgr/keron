import { Action, actions } from "./actions";

type Keymap = Record<string, Action>;

export const keymap: Keymap = {
  " ": actions.playNote,
};
