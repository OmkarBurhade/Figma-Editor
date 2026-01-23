import { removeInputValue, updatePropertiesPanel } from "./properties.js";
import { addResizeHandles, removeResizHandles } from "./resize.js";
import { state } from "./state.js";

export function initSelection(canvas) {
  canvas.addEventListener("click", () => {
    clearSelection();
  });
}

export function attachSelectionToElement(div, id) {
  div.addEventListener("click", (e) => {
    console.log("hello from div");

    e.stopPropagation(); // direct canvas pr click nahi hota event elements tak nahi jate turant hi rook jate he jse ki canvas ke andar rectangle pr click kiya to event rectangle pr click krne pr hi chlega...
    selectElement(id);
  });
}

function selectElement(id) {
  clearSelection();

  // console.log(state.selectedId = id) // id mil gai 😎
  state.selectedId = id;
  const el = document.querySelector(`[data-id="${id}"]`);
  if (el) {
    el.classList.add("selected");
    el.style.cursor = "grab";
  }

  addResizeHandles(el); // resize krne ke liye addResizeHandles() fn ko element pass kr diya
  updatePropertiesPanel(el); //properties update krne ke liye updatePropertiesPanel() fn ko element de diya
}

function clearSelection() {
  state.selectedId = null;
  document.querySelectorAll(".element.selected").forEach((el) => {
    el.classList.remove("selected");
    el.style.cursor = "default";
  });
  removeInputValue()
  removeResizHandles(); // resize ponts ko remove krne ke liye ye fn ha pr call kiya
}
