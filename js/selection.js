import { renderLayers } from "./layers.js";
import { removeInputValue, updatePropertiesPanel } from "./properties.js";
import { addResizeHandles, removeResizHandles } from "./resize.js";
import { addRotateHandle, removeRotateHandles } from "./rotate.js";
import { state } from "./state.js";

export function initSelection(canvas) {
  canvas.addEventListener("click", () => {
    clearSelection();
  });
}

export function attachSelectionToElement(div, id) {
  div.addEventListener("click", (e) => {
    // console.log("hello from div");
    div.style.border = "1px solid #555555";
    e.stopPropagation(); // direct canvas pr click nahi hota event elements tak nahi jate turant hi rook jate he jse ki canvas ke andar rectangle pr click kiya to event rectangle pr click krne pr hi chlega...
    selectElement(id);
  });

  div.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    div.style.border = "none";
    if (!div.classList.contains("element")) return;

    const elData = state.elements.find((x) => x.id === div.dataset.id);
    if (!elData || elData.type !== "text") return;

    enableTextEdit(div);
  });
}

export function selectElement(id) {
  clearSelection();

  const elData = state.elements.find((e) => e.id === id);
  if (elData?.locked) return;

  // console.log(state.selectedId = id) // id mil gai 😎
  state.selectedId = id;
  const el = document.querySelector(`[data-id="${id}"]`);
  const item = document.querySelectorAll(".text-content");
  if (!el) return;

  el.classList.add("selected");
  el.style.cursor = "grab";

  item.forEach((e) => {
    e.classList.add("selected");
    e.style.cursor = "grab";
  });

  // console.log(state.elements.map((e) => e.id));
  addResizeHandles(el); // resize krne ke liye addResizeHandles() fn ko element pass kr diya
  updatePropertiesPanel(el); //properties update krne ke liye updatePropertiesPanel() fn ko element de diya
  renderLayers();
  addRotateHandle(el)
}

function clearSelection() {
  state.selectedId = null;

  document.querySelectorAll(".element.selected").forEach((el) => {
    el.classList.remove("selected");
    el.style.cursor = "default";
  });

  document.querySelectorAll(".element").forEach((el) => {
    el.style.border = "none";
  });

  const item = document.querySelectorAll(".text-content");

  item.forEach((el) => {
    el.classList.remove("selected");
    el.style.cursor = "default";
  });

  removeInputValue();
  removeResizHandles(); // resize points ko remove krne ke liye ye fn ha pr call kiya
  removeRotateHandles(); // rotate points ko remove krne ke liye ye fn ha pr call kiya
}

function enableTextEdit(elementDiv) {
  const elData = state.elements.find((e) => e.id === elementDiv.dataset.id);
  if (!elData || elData.type !== "text") return;

  const resizeHandle = elementDiv.querySelectorAll(".resize-handle");
  const textDiv = elementDiv.querySelector(".text-content");
  textDiv.style.cursor = "text";
  resizeHandle.forEach((e) => (e.style.display = "none"));
  if (!textDiv) return;

  textDiv.contentEditable = true;
  textDiv.focus();

  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(textDiv);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);

  function saveText() {
    textDiv.contentEditable = false;
    elData.text = textDiv.innerText;

    document.getElementById("prop-text").value = textDiv.innerText;

    textDiv.removeEventListener("blur", saveText);
    textDiv.removeEventListener("keydown", handleEnter);
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      textDiv.blur();
    }
  }

  textDiv.addEventListener("blur", saveText);
  textDiv.addEventListener("keydown", handleEnter);
}
