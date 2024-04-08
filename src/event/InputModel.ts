import { InputMode, Modifiers } from "./keymap";

export class InputModel {
  key: string = "";
  combo: string = "";
  mode: InputMode = InputMode.Normal;
  modifiers: Record<keyof typeof Modifiers, boolean> = {
    Shift: false,
    Option: false,
    Edit: false,
  };
}
