import * as Tone from "tone";
import { useModel } from "../state/model";
import { Note } from "tone/build/esm/core/type/NoteUnits";
import { Time } from "tone/build/esm/core/type/Units";

export function playNote(note: Note, duration: Time) {
  const { model } = useModel();

  // console.log("playing audio...");
  model.bank.instruments[0].triggerAttackRelease(note, duration);
}
