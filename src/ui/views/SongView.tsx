import { For } from "solid-js";
import { useModel } from "../../state/model";
import Block from "../components/Block";
import { getTrack } from "../../state/utils";
import Column from "../components/Column";
import Grid from "../components/Grid";
import Gutter from "../components/Gutter";

export default function SongView() {
  const { model } = useModel();
  const cursorLine = () => model.view.cursor.line;
  return (
    <div class="song">
      {/* <div class={styles.mainTitle}>{model.project.active.phrase}</div> */}
      <Grid>
        <Gutter activeLine={cursorLine}></Gutter>
        <For each={model.project.song.tracks}>
          {(trackId, index) => (
            <Column
              text={trackId.toString()}
              active={index() === model.project.active.track}
            >
              <For each={getTrack(trackId).chains}>
                {(_, index) => (
                  <Block
                    text={index().toString()}
                    active={() => index() === model.project.active.chain}
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
