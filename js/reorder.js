import { renderLayers } from "./layers.js";
import { state } from "./state.js";

export function moveLayer(direction) {
  const id = state.selectedId;

  if (!id) return;

  const index = state.elements.findIndex((e) => e.id === id);
  if (index === -1) return;

  let newIndex = direction === "up" ? index + 1 : index - 1;

  if (newIndex < 0 || newIndex >= state.elements.length) return;

  const temp = state.elements[index];
  state.elements[index] = state.elements[newIndex];
  state.elements[newIndex] = temp;
  updateZIndexes();
  renderLayers();
}

function updateZIndexes() {
  state.elements.forEach((el, i) => {
    const domEl = document.querySelector(`[data-id='${el.id}']`);
    if (domEl) {
      domEl.style.zIndex = i + 1;
      el.zIndex = i + 1;
    }
  });
}
