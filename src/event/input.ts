import { useInputModel } from "./InputModelProvider";
import { DEFAULT_KEYMAP, Modifiers } from "./keymap";

/**
 * Initialise event listeners for keypresses
 */
export function onMountInput(element: HTMLElement) {
  element.addEventListener("keydown", keyHandler);
  element.addEventListener("keyup", keyHandler);

  function keyHandler(event: KeyboardEvent) {
    const { input, setInput } = useInputModel();
    const { key } = event;

    setInput("key", key);

    // TODO: Parse DEFAULT_KEYMAP in runtime to be able to switch keymaps with config
    const keymap = DEFAULT_KEYMAP;

    const modifierChanged = Object.entries(keymap.modifiers).find(
      ([_, modKey]) => key.includes(modKey),
    ) as [keyof typeof Modifiers, string] | undefined;

    if (modifierChanged) {
      const [modIndex] = modifierChanged;
      const modStr = Modifiers[modIndex].toString() as keyof typeof Modifiers;

      switch (event.type) {
        case "keydown":
          if (input.modifiers[modStr] === true) return;
          return setInput("modifiers", modStr, true);
        case "keyup":
          return setInput("modifiers", modStr, false);
        default:
          return;
      }
    }

    if (event.type === "keydown") {
      const activeModKeys = Object.entries(input.modifiers)
        .filter(([_, v]) => v === true)
        .map(([k, _]) => k) as (keyof typeof Modifiers)[];

      const COMBO_SEPARATOR = "-";
      const COMBO_SPECIAL = ">";

      const keyCombo = Object.keys(keymap.global).find((combo) => {
        const comboHasMods = combo.includes(COMBO_SEPARATOR);
        const comboParts = combo.split(COMBO_SEPARATOR);
        const comboKeyIndex = comboHasMods ? -1 : 0;
        const comboKey = comboParts.at(comboKeyIndex);
        const comboIsSpecial = comboKey?.includes(COMBO_SPECIAL);
        const inputHasMods = activeModKeys.length > 0;

        // guard clause for obv no match
        if (!comboKey) return false;
        if (!inputHasMods && comboHasMods) return false;

        // basic no-mod keys
        const inputKey = key.toLowerCase().replace(" ", "Space");
        const comboHasInput = comboKey?.includes(inputKey);
        if (!inputHasMods && !comboIsSpecial) return comboHasInput;

        // special keys with <>
        const comboKeySpecial = comboKey.replace(/[<>]/g, "");
        const inputHasComboKeySpecial = inputKey.includes(comboKeySpecial);
        if (!inputHasMods) return inputHasComboKeySpecial;

        // mod combos
        const comboMods = comboParts.slice(0, -1).join().split("");
        const comboHasActiveMods =
          activeModKeys.every((activeMod) => {
            return comboMods.includes(activeMod[0]);
          }) &&
          comboMods.every((comboMod) =>
            activeModKeys.map((mod) => mod[0]).includes(comboMod),
          );

        // mod combo with basic keys
        if (!comboIsSpecial) return comboHasActiveMods && comboHasInput;
        // mod combo with special <> keys
        return comboHasActiveMods && inputHasComboKeySpecial;
      });

      if (!keyCombo) return;
      const action = keymap.global[keyCombo];

      // console.log("action:", action.label);

      if (!action) return;
      action.fn();

      setInput("combo", keyCombo);
    }
  }
}
