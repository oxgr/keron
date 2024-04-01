import styles from "./App.module.css";

import Header from "./ui/sections/Header";
import Main from "./ui/sections/Main";
import Side from "./ui/sections/Side";

function App() {
  return (
    <div class={styles.App}>
      <Header />
      <Main />
      <Side />
    </div>
  );
}

export default App;
