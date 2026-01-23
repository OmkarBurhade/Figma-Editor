import { state } from "./state.js";

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let currentEl = null;


export function initDrag(canvas) {
  document.addEventListener("mousedown", (e) => {
    const item = document.querySelectorAll(".text-content");
    const target = e.target.closest(".element");

    //    console.log(target.classList.contains('element'));
    if (!target) return; // chek kiya element me .element select he ki nahi

    const id = target.dataset.id;
    // console.log(id);

    if (state.selectedId !== id) return;

    isDragging = true;
    currentEl = target;
    currentEl.style.cursor = "grabbing";
    item.forEach((e) => (e.style.cursor = "grabbing"));
    // console.log(currentEl)

    const rect = target.getBoundingClientRect();
    // console.log(offsetX)
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", (e) => {
    // such kahu to ye wala part mene gpt se samjne ki kosis ki lekin ye maths mere sar ke upar se jaa raha he 😭
    if (!isDragging || !currentEl) return;

    const canvasRect = canvas.getBoundingClientRect();

    let newX = e.clientX - canvasRect.left - offsetX;
    let newY = e.clientY - canvasRect.top - offsetY;

    newX = Math.max(
      0,
      Math.min(newX, canvas.clientWidth - currentEl.offsetWidth),
    );
    newY = Math.max(
      0,
      Math.min(newY, canvas.clientHeight - currentEl.offsetHeight),
    );

    currentEl.style.left = newX + "px";
    currentEl.style.top = newY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    currentEl = null;
    // currentEl.style.cursor = 'pointer'
  });
}
