import { For } from "solid-js";
import { useModel } from "../../state/model";
import Block from "../components/Block";
import { getTrack } from "../../state/utils";
import Column from "../components/Column";
import Grid from "../components/Grid";
import Gutter from "../components/Gutter";
import { emptyBlockString, fillArrayTo } from "./utils";

export default function SongView() {
  const { model } = useModel();

  const lineRange = () => model.view.lineRange;
  const cursorLine = () => model.view.cursor.line;
  const cursorColumn = () => model.view.cursor.column;

  const allTracks = () => model.project.song.tracks.map((_, index) => index);
  const allChainsInTrack = (trackId: number) => {
    return !isNaN(trackId) ? getTrack(trackId)?.chains ?? [] : [];
  };

  const fullTracks = (tracks: number[]) => fillArrayTo(tracks, 8);
  const fullChains = (chains: number[]) => fillArrayTo(chains, 16);

  return (
    <div class="song">
      <Grid>
        <Gutter lineRange={lineRange} activeLine={cursorLine}></Gutter>
        <For each={fullTracks(allTracks())}>
          {(trackId, trackIndex) => (
            <Column
              headerText={trackId}
              active={() => trackIndex() === cursorColumn()}
            >
              <For each={fullChains(allChainsInTrack(Number(trackId)))}>
                {(chainId, chainIndex) => (
                  <Block
                    text={chainId}
                    activeLine={() => chainIndex() === cursorLine()}
                    empty={chainId === emptyBlockString(2)}
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
