import { state } from "./state.js";
import { renderLayers } from "./layers.js";
import { removeInputValue } from "./properties.js";

export function deleteSelectedElement() {
  if (!state.selectedId) return;

  const id = state.selectedId;

  state.elements = state.elements.filter((el) => el.id !== id); // state se id ko remove kr raha he

  const el = document.querySelector(`[data-id="${id}"]`); // DOM se remove kr diya
  if (el) el.remove();

  state.selectedId = null; // selection ko clear kr diya

  removeInputValue()
  renderLayers() // layers ko vapas se render kr diya
}
