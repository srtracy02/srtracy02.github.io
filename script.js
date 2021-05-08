var PLAY_WIDTH = 800;
var PLAY_HEIGHT = 400;
var LINE_WIDTH = 10;
var PADDLE_LENGTH = 100;

function makeRect(x, y, width, height, bgcolor) {
  var elem = document.createElement("div");
  var s = elem.style;
  s.position = "absolute";
  s.padding = "0";
  s.backgroundColor = bgcolor;
  s.top = y + "px";
  s.left = x + "px";
  s.width = width + "px";
  s.height = height + "px";
  return elem;
}

if (!document.addEventListener) {
  document.addEventListener = function (eventName, func) {
    eventName = "on" + eventName;
    if (this[eventName]) {
      var temp = this[eventName];
      this[eventName] = function () {
        console.log(event);
        temp(event);
        func(event);
       };
     } else {
      this[eventName] = function () { func(event) };
      }
  };
}

function Player(scoreDisplay, x, y, width, height) {
  this.x = x;
  this.y = y;
  this.startY = y;
  this.width = width;
  this.height = height;
  this.score = 0;
  this.scoreDisplay = scoreDisplay;
  this.elem = makeRect(this.x, this.y, this.width, this.height, "#00ff00");
  document.getElementById("board").appendChild(this.elem);
}

Player.prototype.reset = function () {
  this.moveTo(this.startY);
  this.score = 0;
  this.scoreDisplay.innerHTML = this.score;
};

Player.prototype.moveTo = function (y) {
  this.y = y;
  if (this.y > PLAY_HEIGHT - PADDLE_LENGTH) {
    this.y = PLAY_HEIGHT - PADDLE_LENGTH;
  } else if (this.y < 0) {
    this.y = 0;
  }
  this.elem.style.top = Math.floor(this.y) + "px";
};

Player.prototype.scored = function () {
  this.score++;
  this.scoreDisplay.innerHTML = this.score;
};

Player.prototype.AI = function (ball) {
  if (ball.dx > 0) {
    if (ball.y > this.y + this.height - LINE_WIDTH) {
      this.moveTo(this.y + 1);
    } else if (ball.y < this.y) {
      this.moveTo(this.y - 1);
    }
  }
};

Player.prototype.intersect = function (ball) {
  return (ball.x + ball.width >= this.x) && (ball.x <= this.x + this.width) && (ball.y + ball.height >= this.y) && (ball.y < this.y + this.height);
};

Player.prototype.bounce = function (ball) {
  if (this.intersect(ball)) {
    ball.dx *= -1.1;
    var dy = (this.y + this.height / 2) - (ball.y + ball.height / 2);
    ball.dy -= dy / 333;
    return true;
  }
  return false;
}

function Ball(width, height) {
  this.x = -1000; 
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.width = width;
  this.height = height;
  this.elem = makeRect(this.x, this.y, this.width, this.height, "#00ff00");
  document.getElementById("board").appendChild(this.elem);
}

Ball.prototype.drop = function (direction, speed) {
  this.x = -100;
  this.y = 0;
  this.display();
  
  this.x = (PLAY_WIDTH - LINE_WIDTH) / 2;
  this.y = (PLAY_HEIGHT - LINE_WIDTH) / 2;
  
  var vel = 0.2 + 0.3 * speed / 8;

  var angle = (Math.random() * 2 - 1) * Math.PI / 4;

  this.dx = direction * Math.cos(angle) * vel;
  this.dy = Math.sin(angle) * vel;
};

Ball.prototype.display = function () {
  this.elem.style.top = Math.floor(this.y) + "px";
  this.elem.style.left = Math.floor(this.x) + "px";
};

Ball.prototype.advance = function () {
  this.x += this.dx;
  this.y += this.dy;
};

Ball.prototype.bounced = function (p1, p2, maxY) {
  if (this.y < 0 || this.y >= maxY) {
    this.dy *= -1;
  }
  return p1.bounce(this) || p2.bounce(this);
};

var p1, p2, ball, timer, lastFrame, startButton, statusBox, state;
window.onload = function () {
  startButton = document.getElementById("start");
  statusBox = document.getElementById("status");
  ball = new Ball(LINE_WIDTH, LINE_WIDTH);
  p1 = new Player(
    document.getElementById("score1"),
    LINE_WIDTH,
    (PLAY_HEIGHT - PADDLE_LENGTH) / 2,
    LINE_WIDTH,
    PADDLE_LENGTH);

  p2 = new Player(
    document.getElementById("score2"),
    PLAY_WIDTH - LINE_WIDTH * 2,
    (PLAY_HEIGHT - PADDLE_LENGTH) / 2,
    LINE_WIDTH,
    PADDLE_LENGTH);
}

function movePlayer1(y){
  p1.moveTo(y - PADDLE_LENGTH / 2);
}

if(navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("iPod") != -1 || navigator.userAgent.indexOf("iPhone") != -1 || navigator.userAgent.indexOf("Android") != -1) {
  console.log("Is Mobile OS");
  document.addEventListener("touchmove", function (evt) {
    if (evt.touches.length > 0) {
      movePlayer1(evt.touches[0].pageY);
    }
    evt.preventDefault();
  }); 
} else {
    console.log("Is Desktop OS");
    document.addEventListener("mousemove", function (evt) {
      movePlayer1(evt.clientY);
    });
}
        

function titleScreen(delta) {
}

function prePlay(delta) {
  if (delta < 1000) // Displayed during the first second
    statusBox.innerHTML = "Ready...";
  else if (delta < 2000) // Displayed during the second second
    statusBox.innerHTML = "Set...";
  else if (delta < 3000) // Displayed during the third second
    statusBox.innerHTML = "GO!";
  else {
    statusBox.style.display = "none"; // hide the status box we were just using
    state = updateGame; // change the state of the game to live-action
    return true; // tell the calling function that this function says its okay to update the timer
  }
  return false;
}

function updateGame(delta) {
  for (var i = 0; i < delta && state == updateGame; ++i) {
    ball.advance();
    if (!ball.bounced(p1, p2, PLAY_HEIGHT - LINE_WIDTH)) {
      var scoringPlayer = null;
      if (ball.x < p1.x) {
        scoringPlayer = p2;
      } else if (ball.x > p2.x) {
        scoringPlayer = p1;
      }
    if(scoringPlayer != null){
      scoringPlayer.scored();
      ball.drop(scoringPlayer == p1 ? 1 : -1, p1.score + p2.score);
      statusBox.style.display = "block";
      if (scoringPlayer.score < 5) {
        state = prePlay; 
      } else {
        state = gameOver;
      }
    }
  }
}

if (state == updateGame) {
  for (var i = 0; i < delta; i += AI_STEP) {
    p2.AI(ball);
  }
  ball.display();
}
return true;
}
        
var AI_STEP = 5;

function gameOver(delta){
  if (delta < 3000){
    statusBox.innerHTML = "Game Over";
  } else {
    clearInterval(timer);
    statusBox.style.display = "none";
    startButton.style.display = "block";
    p1.reset();
    p2.reset();
    state = titleScreen;
    return true;
  }
  return false;
}

function timerTick() {
  var currentFrame = new Date().getTime();
  var delta = currentFrame - lastFrame;
  if (state(delta)) {
    lastFrame = currentFrame;
  }
}

function start() {
  startButton.style.display = "none";
  statusBox.style.display = "block";
  lastFrame = new Date().getTime();
  ball.drop(1, 0);
  state = prePlay;
  timer = setInterval(timerTick, 33); //roughly 30 FPS  (1000 / 30) = 33
 }
