import { state } from "./state.js";

let rotating = false;
let currentEl = null;
let centerX = 0;
let centerY = 0;

export function addRotateHandle(elementDiv) {
  const handle = document.createElement("div");
  handle.className = "rotate-handle";

  handle.addEventListener("mousedown", startRotate);

  elementDiv.appendChild(handle);
}

export function removeRotateHandles() {
  document.querySelectorAll(".rotate-handle").forEach((h) => h.remove());
}

function startRotate(e) {
  e.stopPropagation();

  rotating = true;
  currentEl = e.target.parentElement;

  const rect = currentEl.getBoundingClientRect();
  centerX = rect.left + rect.width / 2;
  centerY = rect.top + rect.height / 2;

  document.addEventListener("mousemove", rotateMove);
  document.addEventListener("mouseup", stopRotate);
}

function rotateMove(e) {
  if (!rotating || !currentEl) return;
  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  angle = Number(angle.toFixed(0));

  currentEl.style.transform = `rotate(${angle}deg)`;

  const id = currentEl.dataset.id;
  const elData = state.elements.find((el) => el.id === id);

  if (elData) elData.rotation = angle;
}

function stopRotate() {
  rotating = false;
  currentEl = null;

  document.removeEventListener("mousemove", rotateMove);
  document.removeEventListener("mouseup", stopRotate);
}
