import phrase from "./View.module.css";
import styles from "../../App.module.css";
import { For } from "solid-js";
import { useModel } from "../../state/ModelProvider";
import Grid from "../components/Grid";
import Column from "../components/Column";
import Block from "../components/Block";
import Gutter from "../components/Gutter";
import { emptyBlockString, fillArrayTo, toHexString } from "./utils";

export default function ChainView() {
  const { model, setModel } = useModel();

  const lineRange = () => model.view.lineRange;
  const cursorLine = () => model.view.cursor.line;
  const playheadLine = () => model.view.playhead.line;

  const activeChainId = () => model.view.active.chain;

  // const activeChain = () => getChain(activePhraseId());
  const allPhrasesInChain = (chainId: number) =>
    model.getChain(chainId)?.phrases ?? [];

  return (
    <div class="track">
      <Grid>
        <Gutter
          headerText={toHexString(activeChainId())}
          headerPad={2}
          lineRange={lineRange}
          activeLine={cursorLine}
          playheadLine={playheadLine}
        ></Gutter>
        <Column headerText={"PH"} active={() => true}>
          <For each={fillArrayTo(allPhrasesInChain(activeChainId()), 16)}>
            {(phraseId, phraseIndex) => (
              <Block
                text={phraseId}
                activeLine={() => phraseIndex() === cursorLine()}
                empty={phraseId === emptyBlockString(2)}
                // activeColumn={() => trackIndex() === activeTrack()}
              ></Block>
            )}
          </For>
        </Column>
      </Grid>
    </div>
  );
}
