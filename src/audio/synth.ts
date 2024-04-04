import { useModel } from "../state/model";
import { Note } from "tone/build/esm/core/type/NoteUnits";
import { Time } from "tone/build/esm/core/type/Units";
import { Instrument, InstrumentId, Velocity } from "../types";

export function playNote({
  note,
  duration,
  time,
  velocity,
  instrument: instrumentId,
}: {
  note: Note;
  duration: Time;
  time: Time;
  velocity: Velocity;
  instrument: InstrumentId;
}) {
  const { model } = useModel();
  // console.log({
  //   note,
  //   duration,
  //   time,
  //   velocity,
  //   instrument,
  // });

  // console.log("playing audio...");
  model.bank.instruments[instrumentId].triggerAttackRelease(
    note,
    duration,
    time,
    velocity,
  );
}
