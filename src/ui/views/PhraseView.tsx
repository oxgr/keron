import { For } from "solid-js";
import { useModel } from "../../state/model";
import { getPhrase } from "../../state/utils";
import Grid from "../components/Grid";
import Gutter from "../components/Gutter";
import Column from "../components/Column";
import { emptyBlockString, fillArrayTo, toHexString } from "./utils";
import Block from "../components/Block";
import { Line } from "../../types";

export default function PhraseView() {
  const { model, setModel } = useModel();

  const lineRange = () => model.view.lineRange;
  const playheadLine = () => model.view.playhead.line;
  const cursorLine = () => model.view.cursor.line;
  const cursorColumn = () => model.view.cursor.column;

  const activePhraseId = () => model.view.active.phrase;
  const allLinesInPhrase = (phraseId: number) => {
    return !isNaN(phraseId) ? getPhrase(phraseId)?.lines ?? [] : [];
  };
  const activeLines = () => allLinesInPhrase(activePhraseId());

  const fullLineProps = (
    linePropArr: (string | number | undefined)[],
    { pad = 2 },
  ) => {
    return fillArrayTo(linePropArr, 16, {
      pad,
      hex: false,
    });
  };

  const NOTE_COLUMN_PAD = 3;

  const lineFxMapFn = (key: "fx1" | "fx2" | "fx3") => (line: Line) => {
    if (line[key] === undefined) return undefined;
    const fxNameStr = String.fromCharCode(line[key]?.id + 64) ?? "";
    const fxValueStr = toHexString(line[key]?.val) ?? "";
    return (fxNameStr + fxNameStr).padEnd(2, "-") + fxValueStr.padStart(2, "-");
  };

  const phrasePropColumns: {
    headerText: string;
    key: string;
    pad: number;
    lineMapFn: (line: Line) => string | number | undefined;
  }[] = [
    {
      headerText: "N",
      key: "note",
      pad: 3,
      lineMapFn: (line: Line) => {
        if (line.note === undefined) return undefined;
        return line.note.padEnd(2, "-") + (line.octave ?? "-");
      },
    },
    {
      headerText: "V",
      key: "velocity",
      pad: 2,
      lineMapFn: (line: Line) => {
        if (line.velocity === undefined) return undefined;
        return line.velocity;
      },
    },
    {
      headerText: "I",
      key: "instrument",
      pad: 2,
      lineMapFn: (line: Line) => {
        if (line.instrument === undefined) return undefined;
        return line.instrument;
      },
    },
    {
      headerText: "FX1",
      key: "instrument",
      pad: 4,
      lineMapFn: lineFxMapFn("fx1"),
    },
    {
      headerText: "FX2",
      key: "instrument",
      pad: 4,
      lineMapFn: lineFxMapFn("fx2"),
    },
    {
      headerText: "FX3",
      key: "instrument",
      pad: 4,
      lineMapFn: lineFxMapFn("fx3"),
    },
  ];

  return (
    <div class="track">
      <Grid>
        <Gutter
          headerText={toHexString(activePhraseId())}
          headerPad={2}
          lineRange={lineRange}
          activeLine={cursorLine}
          playheadLine={playheadLine}
        ></Gutter>
        <For each={phrasePropColumns}>
          {({ headerText, key, lineMapFn, pad }, columnIndex) => {
            return (
              <Column
                headerText={headerText}
                headerPad={0}
                active={() => columnIndex() === cursorColumn()}
              >
                <For
                  each={fullLineProps(activeLines().map(lineMapFn), { pad })}
                >
                  {(linePropStr, lineIndex) => {
                    return (
                      <Block
                        text={linePropStr}
                        activeLine={() => lineIndex() === cursorLine()}
                        playheadLine={() => lineIndex() === playheadLine()}
                        empty={linePropStr === emptyBlockString(pad)}
                      ></Block>
                    );
                  }}
                </For>
              </Column>
            );
          }}
        </For>
      </Grid>
    </div>
  );
}
