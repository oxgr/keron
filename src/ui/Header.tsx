import { useModel } from "../state/model";
import styles from "/src/App.module.css";

export default function Header() {
  const { model, setModel } = useModel();

  return (
    <header class={`${styles.header} ${styles.section}`}>
      <h2>header</h2>
    </header>
  );
}
