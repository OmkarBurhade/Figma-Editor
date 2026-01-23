import { state } from "./state.js";

let resizing = false;
let currentHandle = null;
let startX, startY, startW, startH, currentEl;

export function addResizeHandles(elementDiv) {
  const positions = ["tl", "tr", "bl", "br"]; // position points ka array banaya he class me add krne ke liye

  positions.forEach((pos) => {
    // console.log(pos);

    const h = document.createElement("div");

    h.className = `resize-handle handle-${pos}`; // hr yek div me ${pos} postion ka yek class add ho jayega
    h.dataset.pos = pos;

    h.addEventListener("mousedown", startResize);

    elementDiv.appendChild(h);
  });
}

export function removeResizHandles() {
  document.querySelectorAll(".resize-handle").forEach((h) => {
    h.remove();
  });
}

function startResize(e) {
  e.stopPropagation();

  resizing = true;
  currentHandle = e.target.dataset.pos; // jis bhi point pr mousedown krta hu uska data-pos ki value mil ja rahi he 🔥
  // console.log(currentHandle);
  currentEl = e.target.parentElement; // position points pr click krne pr parent yani ki element mil raha he
  // console.log(currentEl)

  const rect = currentEl.getBoundingClientRect(); // getBoundingClientRect() ki madat se muze element ki left top right bottom width height ye pata chala
  startX = e.clientX;
  startY = e.clientY;
  startW = rect.width;
  startH = rect.height;

  document.addEventListener("mousemove", resizeMove);
  document.addEventListener("mouseup", stopResize);
}

function resizeMove(e) {
  // console.log(resizing);

  if (!resizing) return;

  let dx = e.clientX - startX;
  let dy = e.clientY - startY;

  let newW = startW;
  let newH = startH;
  console.log(currentHandle.includes("r"));

  if (currentHandle.includes("r")) newW += dx;
  if (currentHandle.includes("l")) newW -= dx;
  if (currentHandle.includes("b")) newH += dy;
  if (currentHandle.includes("t")) newH -= dy;

  newW = Math.max(20, newW);
  newH = Math.max(20, newH);

  currentEl.style.width = newW + "px";
  currentEl.style.height = newH + "px";

  const elData = state.elements.find((el) => el.id === currentEl.dataset.id);
  if (elData) {
    elData.width = newW;
    elData.height = newH;
  }
}

function stopResize() {
  resizing = false;
  document.removeEventListener("mousemove", resizeMove);
  document.removeEventListener('mouseup', stopResize);
}
