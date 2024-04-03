import components from "/src/ui/components/Components.module.css";
import styles from "/src/App.module.css";

export default function Block({
  text,
  active,
}: {
  text: string;
  active: Function;
}) {
  const paddedText = text.padStart(2, "0");
  return (
    <div class={`${components.block} ${active() ? styles.active : ""}`}>
      {paddedText}
    </div>
  );
}
