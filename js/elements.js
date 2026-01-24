
import { renderLayers } from "./layers.js";
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
    id: crypto.randomUUID(),
    type: "rectangle",
    name: `rectangle ${state.elements.length + 1}`,
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    rotation: 0,
    bgColor: "#4ade80",
    text: "",
    zIndex: state.zIndexCounter++,
    locked: false,
    hidden:false
  };

  state.elements.push(element);
  drawElement(element);
  renderLayers();
}

function createText() {
  const element = {
    id: crypto.randomUUID(),
    type: "text",
    name:`text ${state.elements.length + 1}`,
    x: 180,
    y: 180,
    width: 50,
    height: 20,
    rotation: 0,
    bgColor: "transparent",
    text: "Add text",
    zIndex: state.zIndexCounter++,
    locked: false,
    hidden:false
  };

  state.elements.push(element);
  drawElement(element);
  renderLayers();
}

export function drawElement(el) {
  // console.log(el);
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
  div.style.transform =  `rotate(${el.rotation}deg)`;

   if (el.hidden) { // check kr raha he ki element render hone se pehele visible tha ki nahi agar hidden tha to hidden hi rahega 
    div.style.display = "none";
  }

  document.getElementById("canvas").appendChild(div);

  if (el.type === "text") {
    // text create krne ke liye check kara ki element ka type kya aa raha he text/rectangle! agar text he to hi ye if chalega
    // console.log("hello");
    const content = document.createElement("div");
    content.className = "text-content";
    content.textContent = el.text;
    div.appendChild(content);
    div.style.background = el.bgColor;
    div.style.border = "1px solid #555555";
  }

  attachSelectionToElement(div, el.id);
}

export function renderElements(){
  const canvas = document.getElementById('canvas');
  canvas.innerHTML = '';

  state.elements.forEach(el=>{
    drawElement(el)
  })
}