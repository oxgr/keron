import { For } from "solid-js";
import { useModel } from "../../state/model";
import Block from "../components/Block";
import { getTrack } from "../../state/utils";
import Column from "../components/Column";
import Grid from "../components/Grid";
import Gutter from "../components/Gutter";

export default function SongView() {
  const { model } = useModel();
  const lineRange = () => model.view.lineRange;
  const cursorLine = () => model.view.cursor.line;
  const activeTrack = () => model.project.active.track;
  const activeChain = () => model.project.active.chain;
  const fullTracks = () => {
    const tracks = model.project.song.tracks;
    const len = tracks.length;
    return [...tracks, ...Array(8 - len).fill(0)];
  };

  return (
    <div class="song">
      {/* <div class={styles.mainTitle}>{model.project.active.phrase}</div> */}
      <Grid>
        <Gutter lineRange={lineRange} activeLine={cursorLine}></Gutter>
        <For each={fullTracks()}>
          {(trackId, trackIndex) => (
            <Column
              text={trackId.toString()}
              active={() => trackIndex() === activeTrack()}
            >
              <For each={getTrack(trackId).chains}>
                {(_, chainIndex) => (
                  <Block
                    text={chainIndex().toString()}
                    activeLine={() => chainIndex() === activeChain()}
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
