import { state } from "./state.js";

const widthInput = document.getElementById("prop-width");
const heightInput = document.getElementById("prop-height");
const colorInput = document.getElementById("prop-color");
const textInput = document.getElementById("prop-text");
const textBox = document.getElementById("text-prop-box");
const rotationInput = document.getElementById("prop-rotation");
export function updatePropertiesPanel(el) {
  if (!el) return;
  const id = el.dataset.id;
  // element ka sara data elData me store kia
  const elData = state.elements.find((e) => e.id === id);

  if (!elData) {
    console.warn("Element data not found for id:", id);
    return;
  }

  // console.log(widthInput.value)
  widthInput.value = Number(elData.width).toFixed(2); // input width ki value element me set krne ke liye
  heightInput.value =  Number(elData.height).toFixed(2);
  colorInput.value = elData.bgColor || "#00ff00"; // yaha pr ye extra color add kyu kiya he??

  if (elData.type === "text") {
    textBox.style.display = "block";
    textInput.value = elData.text || "";
  } else {
    textBox.style.display = "none";
  }

  // rotaion 

  rotationInput.value = Number(elData.rotation || 0).toFixed(0);

}

widthInput.addEventListener("input", () => updateSize("width"));
heightInput.addEventListener("input", () => updateSize("height"));
colorInput.addEventListener("input", updateColor);
textInput.addEventListener("input", updateText);
rotationInput.addEventListener('input', updateRotaion)


function updateSize(type) {
  if (!state.selectedId) return; // check kara ki id mil rahi he ki nahi!

  const element = document.querySelector(`[data-id="${state.selectedId}"]`); // element ko select kiya id state id ki madat se!

  const val = type === "width" ? widthInput.value : heightInput.value;

  // element.style.type = val + 'px' ye line ko yesa kyu likha he kyuki agar me element.style krta hu to muze yek array milta he or me array ki andar ki value ko print krna chau to directly ese bhi likh sakta hu element.style[type]
  // console.log(element.style[type]);

  element.style[type] = val + "px";

  const elData = state.elements.find((e) => e.id === state.selectedId);

  elData[type] = Number(Number(val).toFixed(2)); //exact width or height input se calculate krneke liye
}

function updateColor() {
  if (!state.selectedId) return;
  const element = document.querySelector(`[data-id="${state.selectedId}"]`);

  element.style.background = colorInput.value; // box ka color set krdiya
  // console.log(colorInput.value);

  const elData = state.elements.find((e) => e.id === state.selectedId);
  console.log(elData);
  elData.bgColor = colorInput.value;
}

function updateText() {
  if (!state.selectedId) return;

  const element = document.querySelector(`[data-id="${state.selectedId}"]`);
  if (!element) return;

  const textDiv = element.querySelector(".text-content");
  if (!textDiv) return;

  textDiv.innerText = textInput.value;

  const elData = state.elements.find((e) => e.id === state.selectedId);
  elData.text = textInput.value;
}

function updateRotaion(){
  if(!state.selectedId) return;

  const element = document.querySelector(`[data-id='${state.selectedId}']`)

  const val = Number(rotationInput.value) || 0;

  element.style.transform = `rotate(${val}deg)`

  const elData = state.elements.find(e=>e.id === state.selectedId);
  elData.rotation = val

}

export function removeInputValue() {
  widthInput.value = 0;
  heightInput.value = 0;
  rotationInput.value = 0;
}
