
import { drawElement } from "./elements.js";
import { renderLayers } from "./layers.js";
import { state } from "./state.js";

const STORAGE_KEY = "figma_clone_design";

export function saveDesign() {

    try{

        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.elements));
        alert("Design Saved ✅");
        console.log("Saved to localStorage:", state.elements); // checking data store ho raha he ki nahi
    }catch (err){
        console.error("save failed: ", err)
        alert('save failed')
    }

}

export function loadDesignOnStart(){
    const data = localStorage.getItem(STORAGE_KEY);
    if(!data) return;

    const elements = JSON.parse(data);

    state.elements = [] // old state ko clear kr diya 

    const canvas = document.getElementById('canvas')
    canvas.innerHTML = '';
    
    
    
    
    elements.forEach(el=>{
        state.elements.push(el)
        drawElement(el)
    })

    renderLayers();
}


window.addEventListener("DOMContentLoaded", ()=>{
    loadDesignOnStart();

})