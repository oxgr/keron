import { useModel } from "../state/model";
import { Note } from "tone/build/esm/core/type/NoteUnits";
import { Time } from "tone/build/esm/core/type/Units";
import { Instrument, Velocity } from "../types";

export function playNote({
  note,
  duration,
  time,
  velocity,
  instrument,
}: {
  note: Note;
  duration: Time;
  time: Time;
  velocity: Velocity;
  instrument: Instrument;
}) {
  const { model } = useModel();

  // console.log("playing audio...");
  model.bank.instruments[instrument.id].triggerAttackRelease(
    note,
    duration,
    time,
  );
}
