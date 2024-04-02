import { Action, actions } from "./actions";

type Keymap = Record<string, Action>;

/**
 * Map of keyboard keys and the respective actions they trigger
 */
export const keymap: Keymap = {
  " ": actions.togglePlaybackPattern,
  p: actions.printTime,
};
