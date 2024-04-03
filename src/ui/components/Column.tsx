import { ParentProps } from "solid-js";
import components from "/src/ui/components/Components.module.css";

export default function Column({
  text,
  active = false,
  children,
}: ParentProps & {
  text?: string;
  active?: boolean;
}) {
  const renderedText = text ? text.padStart(2, "0") : "";

  return (
    <div class={`${components.column} ${active ? components.active : ""}`}>
      <div class={components.columnHeader}>{renderedText}</div>
      <div class={components.columnBody}>{children}</div>
    </div>
  );
}
