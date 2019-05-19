  
var canvas = document.getElementById("jocCanvas");
var ctx = canvas.getContext("2d");
var blockW = 75;
var blockH = 20;
var x = 245;
var y = 275;
var dx = -1.5;
var dy = -1.75;
var paddleH = 10;
var paddleW = 75;
var paddleX = 210;
var ballR = 9;
var ballC = "lightBlue";
var score = 0;
var rightPressed = false;
var leftPressed = false;
var blockArr = [1, 1, 1, 1, 1];;

function drawBall() {
   ctx.beginPath();
   ctx.arc(x, y, ballR, 0, Math.PI*2);
   ctx.fillStyle = ballC;
   ctx.fill();
   ctx.closePath();
   x += dx;
   y += dy;
}
function drawPaddle() {
   ctx.beginPath();
   ctx.rect(paddleX, canvas.height - paddleH, paddleW, paddleH);
   ctx.fillStyle = "lightBlue";
   ctx.fill();
   ctx.closePath();
}
var redX = 80;
var redY = 20;
function drawRedBlock() {
   ctx.beginPath();
   ctx.rect(redX, redY, blockW, blockH);
   ctx.fillStyle = "red";
   ctx.fill();
   ctx.closePath();
}
var blueX = 205;
var blueY = 20;
function drawBlueBlock() {
   ctx.beginPath();
   ctx.rect(blueX, blueY, blockW, blockH);
   ctx.fillStyle = "blue";
   ctx.fill();
   ctx.closePath();
}
var greenX = 330;
var greenY = 20;
function drawGreenBlock() {
   ctx.beginPath();
   ctx.rect(greenX, greenY, blockW, blockH);
   ctx.fillStyle = "green";
   ctx.fill();
   ctx.closePath();
}
var purpleX = 140;
var purpleY = 60;
function drawPurpleBlock() {
   ctx.beginPath();
   ctx.rect(purpleX, purpleY, blockW, blockH);
   ctx.fillStyle = "purple";
   ctx.fill();
   ctx.closePath();
}
var yellowX = 270;
var yellowY = 60;
function drawYellowBlock() {
   ctx.beginPath();
   ctx.rect(yellowX, yellowY, blockW, blockH);
   ctx.fillStyle = "yellow";
   ctx.fill();
   ctx.closePath();
}
function drawBlackBlock() {
   ctx.beginPath();
   ctx.rect(145, 165, 155, 10);
   ctx.fillStyle = "black";
   ctx.fill();
   ctx.closePath(); 
}
function drawBlocks() {
  if(blockArr[0]==1) {drawRedBlock();}
  if(blockArr[1]==1) {drawBlueBlock();}
  if(blockArr[2]==1) {drawGreenBlock();}
  if(blockArr[3]==1) {drawPurpleBlock();}
  if(blockArr[4]==1) {drawYellowBlock();}
}

function CircleColliding(cx, cy, cr, rw, rh, rx, ry){
    var half = { x: rw/2, y: rh/2 };
    var center = {
        x: cx - (rx+half.x),
        y: cy - (ry+half.y)};
    var side = {
        x: Math.abs (center.x) - half.x,
        y: Math.abs (center.y) - half.y};
    if (side.x >  cr || side.y >  cr)
        return false; 
    if (side.x < -cr && side.y < -cr)
        return true;
    if (side.x < 0 || side.y < 0)
        return true;
    return side.x*side.x + side.y*side.y  < cr*cr;
}

function draw() {
    if(blockArr[0]==0 && blockArr[1]==0 && blockArr[2]==0 && blockArr[3]==0 && blockArr[4]==0 ){
          alert("CONGRATULATIONS! :) \n Score=" + score);
          document.location.reload();
          clearInterval(interval);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBlackBlock();
    drawBlocks();

   if(x + dx > canvas.width-ballR || x + dx < ballR) {
        dx = -dx;
    }
    if(y + dy < ballR) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballR) {
        if(x > paddleX-ballR && x < paddleX + ballR + paddleW) { 
            dy = -dy;
        }
        else {
            alert("GAME OVER :( \n Score=" + score);
            document.location.reload();
            clearInterval(interval);
        }
    }


    if((x+ballR==145 || x-ballR==280) && y>195 && y<225){
      dx = -dx;
      dy = -dy;
    }

    if(CircleColliding(x,y,ballR,145,10,145,165)){
      dy = -dy;
    }
    if(CircleColliding(x,y,ballR,blockW, blockH,redX, redY)){
      dy = -dy;
      blockArr[0] = 0;
      redY = -2000;
      redX = -2000;
      ballC = "red";
      score += 20;
      var scoreStr = "Score: "+ score;
      document.getElementById("scorejoc").innerHTML = scoreStr;
    }
    if(CircleColliding(x,y,ballR,blockW, blockH,blueX, blueY)){
      dy = -dy;
      blockArr[1] = 0;
      blueY = -2000;
      blueX = -2000;
      ballC = "blue";
      score += 40;
      var scoreStr = "Score: "+ score;
      document.getElementById("scorejoc").innerHTML = scoreStr;
    }
    if(CircleColliding(x,y,ballR,blockW, blockH,greenX, greenY)){
      dy = -dy;
      blockArr[2] = 0;
      greenY = -2000;
      greenX = -2000;
      ballC = "green";
      score += 80;
      var scoreStr = "Score: "+ score;
      document.getElementById("scorejoc").innerHTML = scoreStr;
    }
    if(CircleColliding(x,y,ballR,blockW, blockH,purpleX, purpleY)){
      dy = -dy;
      blockArr[3] = 0;
      purpleY = -2000;
      purpleX = -2000;
      ballC = "purple";
      score += 60;
      var scoreStr = "Score: "+ score;
      document.getElementById("scorejoc").innerHTML = scoreStr;
    }
    if(CircleColliding(x,y,ballR,blockW, blockH,yellowX, yellowY)){
      dy = -dy;
      blockArr[4] = 0;
      yellowY = -2000;
      yellowX = -2000;
      ballC = "yellow";
      score += 50;
      var scoreStr = "Score: "+ score;
      document.getElementById("scorejoc").innerHTML = scoreStr;
    }
    if(rightPressed && paddleX < canvas.width - paddleW) {
    paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
    }
    
}
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var interval = setInterval(draw, 10);

 