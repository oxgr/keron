import { useModel } from "../../state/ModelProvider";
import styles from "/src/App.module.css";
import view from "./View.module.css";

export default function ConfigurationView() {
  const { model } = useModel();

  return (
    <div class="configuration">
      <div class={view.mainTitle}>Configuration</div>
    </div>
  );
}
