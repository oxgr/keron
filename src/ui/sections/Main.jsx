import styles from "/src/App.module.css";

export default function Main() {
  return (
    <main class={`${styles.main} ${styles.section}`}>
      <div>main</div>
      <button>hi mom</button>
    </main>
  );
}
