const canvas=document.getElementById('canvas');
const context=canvas.getContext('2d');

function renderCanvas() {
  context.fillStyle="#000";
  context.fillRect(0,0,canvas.width,canvas.height);
}

renderCanvas();
