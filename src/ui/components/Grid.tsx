import { ParentProps } from "solid-js";
import components from "/src/ui/components/Components.module.css";

export default function Grid({ children }: ParentProps) {
  return <div class={`${components.grid}`}>{children}</div>;
}
