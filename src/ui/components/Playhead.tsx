import components from "/src/ui/components/Components.module.css";

export default function Playhead() {
  return (
    <div class={`${components.playhead} ${components.playheadLine}`}>
      {">>"}
    </div>
  );
}
