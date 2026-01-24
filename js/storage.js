import { drawElement } from "./elements.js";
import { renderLayers } from "./layers.js";
import { state } from "./state.js";

const STORAGE_KEY = "figma_clone_design";

export function saveDesign() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.elements));
    alert("Design Saved ✅");
    console.log("Saved to localStorage:", state.elements); // checking data store ho raha he ki nahi
  } catch (err) {
    console.error("save failed: ", err);
    alert("save failed");
  }
}

export function loadDesignOnStart() {
  const canvas = document.getElementById("canvas");
  canvas.innerHTML = "";

  const data = localStorage.getItem(STORAGE_KEY);

  let elements = [];

  if (!data) {
    //  nya user
    elements = createDefaultDesign();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(elements));
  } else {
    //  old user
    elements = JSON.parse(data);
  }

  state.elements = elements;

  elements.forEach(el => {
    drawElement(el);
  });

  renderLayers();
}

function createDefaultDesign() {
  return [
    {
      id: crypto.randomUUID(),
      type: "rectangle",
      name: "rectangle 1",
      x: 60,
      y: 60,
      width: 120,
      height: 90,
      rotation: 0,
      bgColor: "#4ade80",
      text: "",
      zIndex: 1,
      locked: false,
      hidden: false,
    },
    {
      id: crypto.randomUUID(),
      type: "rectangle",
      name: "rectangle 2",
      x: 220,
      y: 120,
      width: 140,
      height: 100,
      rotation: 0,
      bgColor: "#60a5fa",
      text: "",
      zIndex: 2,
      locked: false,
      hidden: false,
    },

    {
      id: crypto.randomUUID(),
      type: "text",
      name: "text 1",
      x: 420,
      y: 80,
      width: 120,
      height: 30,
      rotation: 0,
      bgColor: "transparent",
      text: "Welcome 👋",
      zIndex: 4,
      locked: false,
      hidden: false,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      name: "text 2",
      x: 420,
      y: 140,
      width: 160,
      height: 30,
      rotation: 0,
      bgColor: "transparent",
      text: "Start designing!",
      zIndex: 5,
      locked: false,
      hidden: false,
    },
  ];
}

// window.addEventListener("DOMContentLoaded", () => {
//   loadDesignOnStart();
// });
