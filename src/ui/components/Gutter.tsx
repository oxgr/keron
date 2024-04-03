import { For, ParentProps, createEffect, createSignal } from "solid-js";
import components from "/src/ui/components/Components.module.css";
import Column from "./Column";
import Block from "./Block";
import { useModel } from "../../state/model";

export default function Gutter({ activeLine }: { activeLine: Function }) {
  const lineNrs = (len: number) =>
    Array(len)
      .fill(0, 0, len)
      .map((_, i) => i);

  // const {model} = useModel()

  return (
    <div class={components.gutter}>
      <Column>
        <For each={lineNrs(16)}>
          {(linenr) => (
            <>
              <Block
                text={linenr.toString().padStart(2, "0")}
                active={() => linenr == activeLine()}
              ></Block>
            </>
          )}
        </For>
      </Column>
    </div>
  );
}
