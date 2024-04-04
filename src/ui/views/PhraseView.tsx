import styles from "../../App.module.css";
import { For } from "solid-js";
import { useModel } from "../../state/model";
import { getActivePhrase, getPhrase } from "../../state/utils";
import Grid from "../components/Grid";
import Gutter from "../components/Gutter";
import Column from "../components/Column";
import { emptyBlockString, fillArrayTo, toHexString } from "./utils";
import Block from "../components/Block";
import { Line } from "../../types";

export default function PhraseView() {
  const { model, setModel } = useModel();

  const lineRange = () => model.view.lineRange;
  const cursorLine = () => model.view.cursor.line;
  const cursorColumn = () => model.view.cursor.column;

  const activePhraseId = () => model.view.active.phrase;
  const allLinesInPhrase = (phraseId: number) =>
    getPhrase(phraseId)?.lines ?? [];

  const phrasePropColumns = [
    {
      headerText: "N",
      value: (line: Line) => line.note.padEnd(2, "-") + line.octave,
    },
    { headerText: "V", value: (line: Line) => toHexString(line.velocity) },
    { headerText: "I", value: (line: Line) => toHexString(line.instrument.id) },
  ];

  return (
    <div class="track">
      <Grid>
        <Gutter
          headerText={toHexString(activePhraseId())}
          headerPad={2}
          lineRange={lineRange}
          activeLine={cursorLine}
        ></Gutter>
        <For each={phrasePropColumns}>
          {({ headerText, value }, columnIndex) => {
            const columnPad = 3;
            return (
              <Column
                headerText={headerText}
                headerPad={0}
                active={() => columnIndex() === cursorColumn()}
              >
                <For
                  each={fillArrayTo(
                    allLinesInPhrase(activePhraseId()).map(value),
                    16,
                    {
                      pad: columnPad,
                      hex: false,
                    },
                  )}
                >
                  {(lineId, lineIndex) => (
                    <Block
                      text={lineId}
                      activeLine={() => lineIndex() === cursorLine()}
                      empty={lineId === emptyBlockString(2)}
                    ></Block>
                  )}
                </For>
              </Column>
            );
          }}
        </For>
      </Grid>
    </div>
  );
}
