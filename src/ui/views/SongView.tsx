import { For } from "solid-js";
import { useModel } from "../../state/model";
import Block from "../components/Block";
import { getTrack } from "../../state/utils";
import Column from "../components/Column";
import Grid from "../components/Grid";
import Gutter from "../components/Gutter";
import { fillArrayTo } from "./utils";

export default function SongView() {
  const { model } = useModel();

  const lineRange = () => model.view.lineRange;
  const cursorLine = () => model.view.cursor.line;
  const cursorColumn = () => model.view.cursor.column;

  const activeTrack = () => model.project.active.track;
  const activeChain = () => model.project.active.chain;

  const allTracks = () => model.project.song.tracks;
  const allChainsInTrack = (trackId: number) =>
    !isNaN(trackId) ? getTrack(trackId).chains : [];

  const fullTracks = (tracks: number[]) => fillArrayTo(tracks, 8);
  const fullChains = (chains: number[]) => fillArrayTo(chains, 16);

  return (
    <div class="song">
      {/* <div class={styles.mainTitle}>{model.project.active.phrase}</div> */}
      <Grid>
        <Gutter lineRange={lineRange} activeLine={cursorLine}></Gutter>
        <For each={fullTracks(allTracks())}>
          {(trackId, trackIndex) => (
            <Column
              text={trackId}
              active={() => trackIndex() === cursorColumn()}
            >
              <For each={fullChains(allChainsInTrack(Number(trackId)))}>
                {(chainId, chainIndex) => (
                  <Block
                    text={chainId}
                    activeLine={() => chainIndex() === cursorLine()}
                    // activeColumn={() => trackIndex() === activeTrack()}
                  ></Block>
                )}
              </For>
            </Column>
          )}
        </For>
      </Grid>
    </div>
  );
}
