import { Accessor } from "solid-js";
import { Line as LineType } from "../../types";
import pattern from "../views/View.module.css";

export default function Line({
  line,
  index,
  active,
}: {
  line: LineType;
  index: Accessor<number>;
  active: Function;
}) {
  return (
    <div class={`${pattern.line} ${active() ? pattern.lineActive : null}`}>
      <div class={pattern.linenr}>{index()}</div>
      <div class={pattern.note}>{line.note}</div>
    </div>
  );
}
