const canvas=document.getElementById('canvas');
const context=canvas.getContext('2d');

var username;
var usercolor;

function startScreen() {
  $("#canvas".append(
    $('<img>.attr({id:"start-game", src: 'accessories/start_game.png'}));
}
