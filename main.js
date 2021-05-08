var canvas = document.createElement("canvas"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");

ctx.fillRect(0, 0, width, height);
