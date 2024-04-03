import phrase from "./View.module.css";
import styles from "../../App.module.css";
import { For } from "solid-js";
import { useModel } from "../../state/model";
import { getChain } from "../../state/utils";
import Grid from "../components/Grid";
import Column from "../components/Column";
import Block from "../components/Block";
import Gutter from "../components/Gutter";
import { fillArrayTo, toHexString } from "./utils";

export default function ChainView() {
  const { model, setModel } = useModel();

  const lineRange = () => model.view.lineRange;
  const cursorLine = () => model.view.cursor.line;

  const activeTrackId = () => model.project.active.track;
  const activeChainId = () => model.project.active.chain;
  const activePhraseId = () => model.project.active.phrase;

  // const activeChain = () => getChain(activePhraseId());
  const allPhrasesInChain = (chainId: number) =>
    getChain(chainId)?.phrases ?? [];

  return (
    <div class="track">
      <Grid>
        {/* <div class={styles.mainTitle}>{model.project.active.phrase}</div> */}

        <Gutter lineRange={lineRange} activeLine={cursorLine}></Gutter>
        <Column text={toHexString(activeChainId())} active={() => true}>
          <For each={fillArrayTo(allPhrasesInChain(activeChainId()), 16)}>
            {(phraseId, phraseIndex) => (
              <Block
                text={phraseId}
                activeLine={() => phraseIndex() === activePhraseId()}
                // activeColumn={() => trackIndex() === activeTrack()}
              ></Block>
            )}
          </For>
        </Column>
        {/* <For */}
        {/*   each={} */}
        {/* > */}
        {/*   {(line, index) => ( */}
        {/*     <div */}
        {/*       class={`${phrase.line} ${index() === model.project.active.line ? phrase.lineActive : null}`} */}
        {/*     > */}
        {/*       <div class={phrase.linenr}>{index()}</div> */}
        {/*       <div class={phrase.note}>{line.note}</div> */}
        {/*     </div> */}
        {/*   )} */}
        {/* </For> */}
      </Grid>
    </div>
  );
}
