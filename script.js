const canvas=document.getElementById('canvas');
const context=canvas.getContext('2d');

var username;
var usercolor;

function renderCanvas() {
  context.fillStyle="#000";
  context.fillRect(0,0,canvas.width,canvas.height);
}

render();

function startScreen() {
  $("#canvas".append(
    $('<img>.attr({id:"start-game", src: 'accessories/start_game.png'}));
}
