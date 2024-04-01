export type Model = {
  view: View;
  key: KeyModel;
};

export enum View {
  Settings,
  Song,
  Pattern,
}

export type KeyModel = {
  active: boolean;
  event?: KeyboardEvent;
};
