
import { initDrag } from "./drag.js";
import {  initElements } from "./elements.js";
import { initKeyBordMove } from "./keyboard.js";
import { initSelection } from "./selection.js";
import { loadDesignOnStart, saveDesign } from "./storage.js";

const canvas = document.getElementById("canvas");
document.getElementById('save-btn').onclick = saveDesign


initElements();
initSelection(canvas); // canvas ko selection.js me jo initSelection fn he waha bheja
initDrag(canvas); // canvas ko selection.js me jo initSelection fn he waha bheja
initKeyBordMove(canvas)
loadDesignOnStart() // localStorage ka data call kr diya