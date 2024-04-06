import { useModel } from "../../state/model";
import Grid from "../components/Grid";
import Block from "../components/Block";

export default function instrumentView() {
  const { model, setModel } = useModel();

  const cursorLine = () => model.view.cursor.line;
  const cursorColumn = () => model.view.cursor.column;

  return (
    <div class="instrument">
      <Grid>
        <Block text={"INST"}></Block>
      </Grid>
    </div>
  );
}
