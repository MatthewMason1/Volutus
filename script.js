// Global variables
let frames = [];
let currentFrame = 0;

// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// JavaScript functions for button functionality
function toggleTool(toolName) {
  const button = document.getElementById(toolName + 'Btn');
  const isActive = button.classList.contains("active");

  // Remove the active class from all buttons
  const buttons = document.querySelectorAll("#toolbar button");
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Toggle the active class on the selected button
  if (!isActive) {
    button.classList.add("active");
  }
}

function deleteDrawing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = 'drawing.png';
  link.click();
}

function importImage() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function addFrame() {
  const frameCanvas = document.createElement('canvas');
  frameCanvas.width = canvas.width;
  frameCanvas.height = canvas.height;
  const frameCtx = frameCanvas.getContext('2d');
  frameCtx.drawImage(canvas, 0, 0);

  frames.splice(currentFrame + 1, 0, frameCanvas);
  currentFrame++;
  updateFrameCount();
  updatePreviewCanvas();
}

function duplicateFrame() {
  const frameCanvas = document.createElement('canvas');
  frameCanvas.width = canvas.width;
  frameCanvas.height = canvas.height;
  const frameCtx = frameCanvas.getContext('2d');
  frameCtx.drawImage(canvas, 0, 0);

  frames.splice(currentFrame, 0, frameCanvas);
  currentFrame++;
  updateFrameCount();
  updatePreviewCanvas();
}

function deleteFrame() {
  if (frames.length <= 1) {
    return;
  }

  frames.splice(currentFrame, 1);
  currentFrame = Math.min(currentFrame, frames.length - 1);
  updateFrameCount();
  updatePreviewCanvas();
}

function updateFrameCount() {
  const frameCountValue = document.getElementById('frameCountValue');
  frameCountValue.textContent = frames.length;
}

function updatePreviewCanvas() {
  const previewCanvas = document.getElementById('previewCanvas');
  const previewCtx = previewCanvas.getContext('2d');

  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

  if (frames.length > 0) {
    const frame = frames[currentFrame];
    previewCtx.drawImage(frame, 0, 0, previewCanvas.width, previewCanvas.height);
  }
}

function playAnimation() {
  // ...
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.target.click();
  }
}