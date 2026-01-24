
import { initDrag } from "./drag.js";
import {  initElements } from "./elements.js";
import { exportHTML, exportJSON, exportPNG } from "./export.js";
import { initKeyBordMove } from "./keyboard.js";
import { initSelection } from "./selection.js";
import { loadDesignOnStart, saveDesign } from "./storage.js";

const canvas = document.getElementById("canvas");
document.getElementById('save-btn').onclick = saveDesign
document.getElementById("export-json-btn").onclick = exportJSON;
document.getElementById("export-html-btn").onclick = exportHTML;
document.getElementById("export-png-btn").onclick = exportPNG;

initElements();
initSelection(canvas); // canvas ko selection.js me jo initSelection fn he waha bheja
initDrag(canvas); // canvas ko selection.js me jo initSelection fn he waha bheja
initKeyBordMove(canvas)
loadDesignOnStart() // localStorage ka data call kr diya