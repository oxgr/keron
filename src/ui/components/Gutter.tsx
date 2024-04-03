import { For } from "solid-js";
import components from "/src/ui/components/Components.module.css";
import Column from "./Column";
import Block from "./Block";

export default function Gutter({
  headerText = "",
  headerPad = 0,
  lineRange,
  activeLine,
}: {
  headerText?: string;
  headerPad?: number;
  lineRange: () => number[];
  activeLine: () => number;
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
            <Block
              text={linenr.toString(16).toUpperCase().padStart(2, "0")}
              activeLine={() => linenr == activeLine()}
              // activeColumn={() => true}
            ></Block>
          )}
        </For>
      </Column>
    </div>
  );
}
