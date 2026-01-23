import { initDrag } from "./drag.js";
import { initElements } from "./elements.js";
import { initSelection } from "./selection.js";
const canvas = document.getElementById('canvas')

initElements();
initSelection(canvas) // canvas ko selection.js me jo initSelection fn he waha bheja
initDrag(canvas) // canvas ko selection.js me jo initSelection fn he waha bheja
