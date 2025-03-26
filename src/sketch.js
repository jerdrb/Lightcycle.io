let w = 800;
let h = 800;
let n = 25;
let P1Hit = false;
let P2Hit = false;
px = 10;
py = 10;
P1posx = w / 2 - px / 2;
P1oldx = P1posx;
P1posy = 10;
P1oldy = P1posy;
P1direction = "down";
P2posx = w / 2 - px / 2;
P2oldx = P2posx;
P2posy = 790;
P2oldy = P2posy;
P2direction = "up";
speed = 4;
let gameOver = false;
winner = "N/A";

class LineElement {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  drawDim() {
    line(this.x1, this.y1, this.x2, this.y2);
  }
  collisionDetect(rx, ry, rw, rh) {
    return collideLineRect(this.x1, this.y1, this.x2, this.y2, rx, ry, rw, rh);
  }
}

let P1LineArray = [];
let P2LineArray = [];

function setup() {
  createCanvas(w, h);
  button = createButton("Restart");
  button.position(w / 2 - 30, 400);
  button.mousePressed(restart);
  button.hide();
}

function draw() {
  stroke(100, 100, 180);
  strokeWeight(2);
  background(40);
  if (gameOver == true) {
    gameOverMenu();
  } else {
    for (let x = w / n; x < w; x += w / n) {
      line(x, 0, x, h);
    }
    for (let y = h / n; y < h; y += h / n) {
      line(0, y, w, y);
    }
    drawP1();
    updateP1();
    drawP2();
    updateP2();
    allLineArray = concat(P1LineArray, P2LineArray);
    checkP1Collision();
    checkP2Collision();
    checkHit();
  }
}

function drawP1() {
  fill("magenta");
  stroke("magenta");
  strokeWeight(5);
  rect(P1posx, P1posy, px, py);
  newLineSeg = new LineElement(P1oldx + 5, P1oldy + 5, P1posx + 5, P1posy + 5);
  P1LineArray.push(newLineSeg);
  for (let seg of P1LineArray) {
    seg.drawDim();
  }
}

function updateP1() {
  P1oldx = P1posx;
  P1oldy = P1posy;
  switch (P1direction) {
    case "left":
      P1posx = P1posx - speed;
      break;
    case "right":
      P1posx = P1posx + speed;
      break;
    case "up":
      P1posy = P1posy - speed;
      break;
    case "down":
      P1posy = P1posy + speed;
      break;
  }
}

function checkP1Collision() {
  for (let seg of concat(
    P1LineArray.slice(0, P1LineArray.length - 2),
    P2LineArray
  )) {
    P1Hit = seg.collisionDetect(P1posx, P1posy, px, py);
    if (P1Hit == false) {
      if (P1posx > w || P1posx < 0 || P1posy > h || P1posy < 0) {
        P1Hit = true;
        break;
      } else {
        continue;
      }
    } else {
      break;
    }
  }
}

function drawP2() {
  fill("lightgreen");
  stroke("lightgreen");
  rect(P2posx, P2posy, px, py);
  newLineSeg = new LineElement(P2oldx + 5, P2oldy + 5, P2posx + 5, P2posy + 5);
  P2LineArray.push(newLineSeg);
  for (let seg of P2LineArray) {
    seg.drawDim();
  }
}

function updateP2() {
  P2oldx = P2posx;
  P2oldy = P2posy;
  switch (P2direction) {
    case "left":
      P2posx = P2posx - speed;
      break;
    case "right":
      P2posx = P2posx + speed;
      break;
    case "up":
      P2posy = P2posy - speed;
      break;
    case "down":
      P2posy = P2posy + speed;
      break;
  }
}

function checkP2Collision() {
  for (let seg of concat(
    P2LineArray.slice(0, P2LineArray.length - 2),
    P1LineArray
  )) {
    P2Hit = collideLineRect(
      seg.x1,
      seg.y1,
      seg.x2,
      seg.y2,
      P2posx,
      P2posy,
      px,
      py
    );
    if (P2Hit == false) {
      if (P2posx > w || P2posx < 0 || P2posy > h || P2posy < 0) {
        P2Hit = true;
        break;
      } else {
        continue;
      }
    } else {
      break;
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (P1direction !== "right") {
      P1direction = "left";
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (P1direction !== "left") {
      P1direction = "right";
    }
  } else if (keyCode === UP_ARROW) {
    if (P1direction !== "down") {
      P1direction = "up";
    }
  } else if (keyCode === DOWN_ARROW) {
    if (P1direction !== "up") {
      P1direction = "down";
    }
  } else if (key == "a") {
    if (P2direction !== "right") {
      P2direction = "left";
    }
  } else if (key == "d") {
    if (P2direction !== "left") {
      P2direction = "right";
    }
  } else if (key == "w") {
    if (P2direction !== "down") {
      P2direction = "up";
    }
  } else if (key == "s") {
    if (P2direction !== "up") {
      P2direction = "down";
    }
  }
}

function checkHit() {
  if (P1Hit == true && P2Hit == true) {
    gameOver = true;
    winner = "Stalemate";
  } else if (P1Hit == true) {
    gameOver = true;
    winner = "Player 2";
  } else if (P2Hit == true) {
    gameOver = true;
    winner = "Player 1";
  }
}

function gameOverMenu() {
  button.show();
  textSize(44);
  textAlign(CENTER, CENTER);
  text("Game Over!", w / 2, 150);
  text("The Winner is: " + winner, w / 2, 300);
}

function restart() {
  P1posx = w / 2 - px / 2;
  P1oldx = P1posx;
  P1posy = 10;
  P1oldy = P1posy;
  P1direction = "down";
  P2posx = w / 2 - px / 2;
  P2oldx = P2posx;
  P2posy = 790;
  P2oldy = P2posy;
  P2direction = "up";
  winner = "N/A";
  gameOver = false;
  button.hide();
  P1Hit = false;
  P2Hit = false;
  P1LineArray = [];
  P2LineArray = [];
}
