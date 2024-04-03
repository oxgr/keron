import styles from "../../App.module.css";
import { For } from "solid-js";
import { useModel } from "../../state/model";
import Line from "../components/Line";
import { getActivePhrase, getPhrase } from "../../state/utils";
import Grid from "../components/Grid";
import Gutter from "../components/Gutter";
import Column from "../components/Column";
import { fillArrayTo, toHexString } from "./utils";
import Block from "../components/Block";

export default function PhraseView() {
  const { model, setModel } = useModel();

  const lineRange = () => model.view.lineRange;
  const cursorLine = () => model.view.cursor.line;

  const activePhraseId = () => model.project.active.phrase;
  const allLinesInPhrase = (phraseId: number) =>
    getPhrase(phraseId)?.lines ?? [];

  return (
    <div class="track">
      <Grid>
        <Gutter lineRange={lineRange} activeLine={cursorLine}></Gutter>
        <Column text={toHexString(activePhraseId())} active={() => true}>
          <For
            each={fillArrayTo(
              allLinesInPhrase(activePhraseId()).map((line) => line.note),
              16,
            )}
          >
            {(lineId, lineIndex) => (
              <Block
                text={lineId}
                activeLine={() => lineIndex() === cursorLine()}
                // activeColumn={() => trackIndex() === activeTrack()}
              ></Block>
            )}
          </For>
        </Column>
      </Grid>
      {/* <div class={styles.mainTitle}>{model.project.active.phrase}</div> */}
      {/* <For each={getActivePhrase().lines}> */}
      {/*   {(line, index) => ( */}
      {/*     <Line */}
      {/*       line={line} */}
      {/*       index={index} */}
      {/*       active={() => index() === model.project.active.line} */}
      {/*     ></Line> */}
      {/*   )} */}
      {/* </For> */}
    </div>
  );
}
