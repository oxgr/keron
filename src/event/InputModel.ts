export class InputModel {
  key: string = "";
  modifiers: {
    shift: boolean;
    option: boolean;
    edit: boolean;
  } = {
    shift: false,
    option: false,
    edit: false,
  };
}
