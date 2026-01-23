import { attachSelectionToElement } from "./selection.js";
import { state } from "./state.js";
export function initElements() {
  const rectBtn = document.querySelector("#addRectBtn");
  const textBtn = document.querySelector("#addTextBtn");

  rectBtn.addEventListener("click", createRectangle);
  textBtn.addEventListener("click", createText);
}

function createRectangle() {
  const element = {
    id: "el_" + Date.now(),
    type: "rectangle",
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    rotation: 0,
    bgColor: "#4ade80",
    text: "",
    zIndex: state.zIndexCounter++,
  };

  state.elements.push(element);
  drawElement(element);
}

function createText() {
  const element = {
    id: "el_" + Date.now(),
    type: "text",
    x: 180,
    y: 180,
    width: 50,
    height: 20,
    rotation: 0,
    bgColor: "transparent",
    text: "Add text",
    zIndex: state.zIndexCounter++,
  };

  state.elements.push(element);
  drawElement(element);
}

function drawElement(el) {
  const div = document.createElement("div");
  div.className = "element";

  div.dataset.id = el.id;

  div.style.position = "absolute";
  div.style.left = el.x + "px";
  div.style.top = el.y + "px";
  div.style.width = el.width + "px";
  div.style.height = el.height + "px";
  div.style.background = el.bgColor;
  div.style.zIndex = el.zIndex;

  document.getElementById("canvas").appendChild(div);

  if (el.type === "text") {  // text create krne ke liye check kara ki element ka type kya aa raha he text/rectangle! agar text he to hi ye if chalega
    // console.log("hello");

    
    div.textContent = el.text;
    div.style.background = el.bgColor;
    div.style.border = "1px solid #555555";
  }

  attachSelectionToElement(div, el.id);
}
