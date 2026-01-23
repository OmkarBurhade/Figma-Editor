import { state } from "./state.js";
import { selectElement } from "./selection.js";
import { deleteSelectedElement } from "./delete.js";

let isRenaming = false;
let clickTimer = null;
export function renderLayers() {
  // console.log("hello from layers");

  const layersList = document.getElementById("layers-list");

  layersList.innerHTML = "";

  const elements = state.elements.slice().reverse(); // jo letest element hoga wo sabse uper dikhga is liye state ko .reverse() kr diya or use slice krdiya

  elements.forEach((el) => {
    const row = document.createElement("div");
    row.className = "layer-row";

    const item = document.createElement("div");
    item.className = "layer-item";
    // item.textContent = `${el.type} (${el.id.slice(0,6)})`
    item.innerText = el.name;

    row.addEventListener("click", (e) => {
      e.stopPropagation();

      if (isRenaming) return;

      clearTimeout(clickTimer);

      clickTimer = setTimeout(() => {
        selectElement(el.id);
      }, 180); // yek delay lagaya he kyuki DOM destroy na ho wo recreate na ho isliye

      selectElement(el.id);
    });

    item.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      console.log("hello");

      clearTimeout(clickTimer); // pending select ko cancel krneke liye

      enableRename(item, el);
    });

    if (el.id === state.selectedId) {
      row.classList.add("active");
    }

    // item.onclick = () => {
    //   selectElement(el.id);
    // };

    // yaha delete btn add kiya
    const delBtn = document.createElement("button");
    delBtn.innerText = "🗑";
    delBtn.className = "delete-layer-btn";

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      selectElement(el.id); // delete krnese pehele konsa element delete krna he wo select kiya he
      deleteSelectedElement();
    });

    // row.addEventListener("click", () => {
    //   if (isRenaming) return;
    //   selectElement(el.id);
    // });

    row.appendChild(item);
    row.appendChild(delBtn);
    layersList.appendChild(row);
    // layersList.appendChild(item)

    

  });
}
function enableRename(layer, el) {
  isRenaming = true;

  const input = document.createElement("input");
  input.type = "text";
  input.value = el.name;
  input.className = "layer-rename-input";

  layer.style.display = "none";
  layer.parentElement.insertBefore(input, layer);

  input.focus();
  input.select();

  function save() {
    const newName = input.value.trim() || el.name;
    el.name = newName;

    isRenaming = false;
    renderLayers();
  }

  input.addEventListener("blur", save);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") {
      isRenaming = false;
      renderLayers();
    }
  });
}
