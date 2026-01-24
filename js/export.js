import { state } from "./state.js";

export function exportJSON() {
  const data = JSON.stringify(state.elements, null, 2);
  downloadFile(data, "design.json", "application/json");
}

export function exportHTML() {
  let html = ` <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Exported Design</title>
</head>
<body style="position:relative;width:100vw;height:100vh;">`;

  state.elements.forEach((el) => {
    if (el.hidden) return;

    const style = `position:absolute;
                    left:${el.x}px;
                    top:${el.y}px;
                    width:${el.width}px;
                    height:${el.height}px;
                    background:${el.bgColor};
                    transform:rotate(${el.rotation}deg);
                    z-index:${el.zIndex};`;

    if (el.type === "text") {
      html += `<div style="${style}">${el.text}</div>\n`;
    } else {
      html += `<div style="${style}"></div>\n`;
    }
  });

  html += `</body> </html>`;

  downloadFile(html, "design.html", "text/html");
}

export function exportPNG() {
  const canvasWidth = 1200;
  const canvasHeight = 800;

  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = canvasWidth;
  exportCanvas.height = canvasHeight;

  const ctx = exportCanvas.getContext("2d");

  // background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // sort by zIndex
  const elements = [...state.elements].sort((a, b) => a.zIndex - b.zIndex);

  elements.forEach((el) => {
    if (el.hidden) return;

    ctx.save();

    const cx = el.x + el.width / 2;
    const cy = el.y + el.height / 2;

    ctx.translate(cx, cy);
    ctx.rotate((el.rotation * Math.PI) / 180);
    ctx.translate(-el.width / 2, -el.height / 2);

    if (el.type === "rectangle") {
      ctx.fillStyle = el.bgColor;
      ctx.fillRect(0, 0, el.width, el.height);
    }

    if (el.type === "text") {
      ctx.fillStyle = "#000";
      ctx.font = "16px Arial";
      ctx.textBaseline = "top";
      ctx.fillText(el.text, 0, 0);
    }

    ctx.restore();
  });

  const imgData = exportCanvas.toDataURL("image/png");
  downloadBase64(imgData, "design.png");
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

function downloadBase64(base64, filename) {
  const a = document.createElement("a");
  a.href = base64;
  a.download = filename;
  a.click();
}
