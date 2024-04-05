import { For, Show } from "solid-js";
import components from "/src/ui/components/Components.module.css";
import Column from "./Column";
import Block from "./Block";
import Playhead from "./Playhead";

export default function Gutter({
  headerText = "",
  headerPad = 0,
  lineRange,
  activeLine,
  playheadLine = () => -1,
}: {
  headerText?: string;
  headerPad?: number;
  lineRange: () => number[];
  activeLine: () => number;
  playheadLine?: () => number;
}) {
  const lineNrs = (range: number[]) =>
    Array(16)
      .fill(0, range[0], range[1])
      .map((_, i) => i);

  return (
    <div class={components.gutter}>
      <Column headerText={headerText} headerPad={headerPad}>
        <For each={(() => lineNrs(lineRange()))()}>
          {(linenr) => (
            <>
              <Show when={linenr === playheadLine()}>
                <Playhead></Playhead>
              </Show>
              <Block
                text={linenr.toString(16).toUpperCase().padStart(2, "0")}
                activeLine={() => linenr == activeLine()}
                playheadLine={() => linenr === playheadLine()}
                // activeColumn={() => true}
              ></Block>
            </>
          )}
        </For>
      </Column>
    </div>
  );
}
