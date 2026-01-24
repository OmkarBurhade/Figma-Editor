import { state } from "./state.js";
import { deleteSelectedElement } from "./delete.js";
import { moveLayer } from "./reorder.js";

export function initKeyBordMove(canvas) {
  
  document.addEventListener("keydown", (e) => {
    if (!state.selectedId) return;

     // delete key
    if (e.key === "Delete") {
      deleteSelectedElement();
    }

      // layer ko uper or niche krne wale key
    if (e.ctrlKey && e.key === "]") {
      e.preventDefault();
      moveLayer("up");
    } else if ((e.ctrlKey || e.metaKey) && e.key === "]") {
      e.preventDefault();
      moveLayer("up");
    }

    if (e.ctrlKey && e.key === "[") {
      e.preventDefault();
      moveLayer("down");
    } else if ((e.ctrlKey || e.metaKey) && e.key === "[") {
      e.preventDefault();
      moveLayer("down");
    }

    // element ko Left, right, top, bottom krne wale key
    const el = document.querySelector(`[data-id="${state.selectedId}"]`);
    if (!el) return;

    let step = 4;

    let left = parseFloat(el.style.left) || 0;
    let top = parseFloat(el.style.top) || 0;

    switch (e.key) {
      case "ArrowUp":
        top -= step;
        break;
      case "ArrowDown":
        top += step;
        break;
      case "ArrowLeft":
        left -= step;
        break;
      case "ArrowRight":
        left += step;
        break;
      default:
        return;
    }

    e.preventDefault();

    el.style.left = left + "px";
    el.style.top = top + "px";

    // state update
    const elData = state.elements.find((x) => x.id === state.selectedId);
    if (elData) {
      elData.x = left;
      elData.y = top;
    }

   
  });

  // delete key
  document.addEventListener("keydown", (e) => {});


  document.addEventListener("keydown", (e) => {
    if (!state.selectedId) return;

    
  });
}
