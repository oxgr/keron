import { Accessor } from "solid-js";
import { Line as LineType } from "../../types";
import phrase from "../views/View.module.css";

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
    <div class={`${phrase.line} ${active() ? phrase.lineActive : null}`}>
      <div class={phrase.linenr}>{index()}</div>
      <div class={phrase.note}>{line.note}</div>
    </div>
  );
}
