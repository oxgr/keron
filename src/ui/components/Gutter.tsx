import { For, ParentProps, createEffect, createSignal } from "solid-js";
import components from "/src/ui/components/Components.module.css";
import Column from "./Column";
import Block from "./Block";
import { useModel } from "../../state/model";

export default function Gutter({
  lineRange,
  activeLine,
}: {
  lineRange: () => number[];
  activeLine: () => number;
}) {
  const lineNrs = (range: number[]) =>
    Array(16)
      .fill(0, range[0], range[1])
      .map((_, i) => i);

  return (
    <div class={components.gutter}>
      <Column>
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
