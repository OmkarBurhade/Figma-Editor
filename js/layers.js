import { state } from "./state.js";
import { selectElement } from "./selection.js";
import { deleteSelectedElement } from "./delete.js";
import { moveLayer } from "./reorder.js";

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

    if (el.locked) row.classList.add("locked");
    if (el.hidden) row.classList.add("hidden");

    // yaha delete btn add kiya
    const delBtn = document.createElement("button");
    delBtn.innerText = "🗑";
    delBtn.className = "delete-layer-btn";

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      selectElement(el.id); // delete krnese pehele konsa element delete krna he wo select kiya he
      deleteSelectedElement();
    });


    const upBtn = document.createElement('button')
    upBtn.innerText = '🔼'
    upBtn.className = 'layer-move-btn'

    upBtn.onclick = (e)=>{
      e.stopPropagation()
      selectElement(el.id)
      moveLayer('up');
    }

    const downBtn = document.createElement('button')
    downBtn.innerText = '🔽'
    downBtn.className = 'layer-move-btn'

    downBtn.onclick = (e)=>{
      e.stopPropagation()
      selectElement(el.id)
      moveLayer('down');
    }


    // hide show lock unlock

    const hideBtn = document.createElement("button");
    hideBtn.innerText = el.hidden ? "🫣" : "👁️";
    hideBtn.className = "layer-hide-btn";

    hideBtn.onclick = (e) => {
      e.stopPropagation();
      toggleHide(el.id);
    };

    const lockBtn = document.createElement("button");
    lockBtn.innerText = el.locked ? "🔒" : "🔓";
    lockBtn.className = "layer-lock-btn";

    lockBtn.onclick = (e) => {
      e.stopPropagation();
      toggleLock(el.id);
    };

    row.appendChild(item);
    row.appendChild(upBtn);
    row.appendChild(downBtn);
    row.appendChild(delBtn);
    row.appendChild(hideBtn);
    row.appendChild(lockBtn);
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

function toggleHide(id) {
  const elData = state.elements.find((e) => e.id === id);
  if (!elData) return;

  elData.hidden = !elData.hidden;

  const dom = document.querySelector(`[data-id="${id}"]`);
  if (dom) {
    dom.style.display = elData.hidden ? "none" : "block";
  }

  renderLayers();
}

function toggleLock(id) {
  const elData = state.elements.find((e) => e.id === id);
  if (!elData) return;

  elData.locked = !elData.locked;

  renderLayers();
}
