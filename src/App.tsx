import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

import styles from "./App.module.css";

import Header from "./ui/sections/Header";
import Main from "./ui/sections/Main";
import Side from "./ui/sections/Side";

function testType(view: View) {
  return;
}

testType(View.Settings);

function App() {
  const modelDefault: Model = { view: View.Settings };
  const [model, setModel] = createStore(modelDefault);
  return (
    <div class={styles.App}>
      <Header />
      <Main />
      <Side />
    </div>
  );
}

export default App;
