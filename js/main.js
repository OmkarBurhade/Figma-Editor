import { deleteSelectedElement } from "./delete.js";
import { initDrag } from "./drag.js";
import { initElements } from "./elements.js";
import { initSelection } from "./selection.js";

const canvas = document.getElementById("canvas");

document.addEventListener('keydown', (e)=>{
    if(e.key === "Delete"){
        deleteSelectedElement();
    }
})

initElements();
initSelection(canvas); // canvas ko selection.js me jo initSelection fn he waha bheja
initDrag(canvas); // canvas ko selection.js me jo initSelection fn he waha bheja
