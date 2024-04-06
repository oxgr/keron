import { useModel } from "../../state/init";
import styles from "/src/App.module.css";
import view from "./View.module.css";

export default function ProjectView() {
  const { model } = useModel();

  return (
    <div class="project">
      <div class={view.mainTitle}>{model.project.name}</div>
    </div>
  );
}
