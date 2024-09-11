const canvas = document.getElementById("myCanva");
const ctx = canvas.getContext("2d");
const canvaWidth = 600;
const canvaHeight = 400;

let started = false;

function draw() {
  canvas.width = canvaWidth;
  canvas.height = canvaHeight;
}

function start() {
  started = true;

  ctx.clearRect(0, 0, 10, 400);

  //variaveis bola
  let raio = 5;
  let ballX = 300;
  let ballY = 200;
  let ballSpeedX = 5;
  let ballSpeedY = 5;

  //variaveis raqueteUm
  let raqUmX = 10;
  let raqUmY = 150;
  let moveUpUm;
  let moveDownUm;

  //variaveis raqueteDois
  let raqDoisX = 580;
  let raqDoisY = 150;
  let moveUpDois;
  let moveDownDois;

  function drawRaq() {
    ctx.beginPath();
    //ctx.clearRect(10, 0, 10, 400);
    ctx.rect(raqUmX, raqUmY, 10, 60);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  function drawRaqDois() {
    ctx.beginPath();
    //ctx.clearRect(raqDoisX, 0, 10, 400);
    ctx.rect(raqDoisX, raqDoisY, 10, 60);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  function drawBola() {
    ctx.beginPath();
    //ctx.clearRect(ballX + 1, ballY, raio, raio)
    bola = ctx.arc(ballX, ballY, raio, 0, 2 * Math.PI); // Desenhar um círculo completo
    ctx.fillStyle = "white";
    ctx.fill(); // Preencher o círculo
    ctx.closePath();
  }

  function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  }

  function raqCollide() {
    if (ballX - raio <= raqUmX + 60 && ballX + raio >= raqUmX) {
      if (ballY >= raqUmY && ballY <= raqUmY + 10) {
        ballSpeedX *= -1;
      }
    }
    if (ballY - raio <= raqDoisX + 60 && ballX + raio >= raqDoisX) {
      if (ballY >= raqDoisY && ballY <= raqDoisY + 10) {
        ballSpeedX *= -1;
      }
    }
  }

  function wallCollideBall() {
    if (ballX + raio > 600 || ballX - raio < 0) {
      ballSpeedX *= -1;
    }
    if (ballY + raio > 400 || ballY - raio < 0) {
      ballSpeedY *= -1;
    }
  }

  addEventListener("keydown", (event) => {
    if (event.keyCode === 87) {
      moveUpUm = true;
    }
    if (event.keyCode === 83) {
      moveDownUm = true;
    }
    if (event.keyCode === 38) {
      moveUpDois = true;
    }
    if (event.keyCode === 40) {
      moveDownDois = true;
    }
  });

  addEventListener("keyup", (event) => {
    if (event.keyCode === 87) {
      moveUpUm = false;
    }
    if (event.keyCode === 83) {
      moveDownUm = false;
    }
    if (event.keyCode === 38) {
      moveUpDois = false;
    }
    if (event.keyCode === 40) {
      moveDownDois = false;
    }
  });

  function update() {
    if (moveUpUm && raqUmY > 0) {
      raqUmY -= 5;
    }
    if (moveDownUm && raqUmY + 60 < 400) {
      raqUmY += 5;
    }
    if (moveUpDois && raqDoisY > 0) {
      raqDoisY -= 5;
    }
    if (moveDownDois && raqDoisY + 60 < 400) {
      raqDoisY += 5;
    }

    ctx.clearRect(0, 0, canvaWidth, canvaWidth);

    wallCollideBall();
    moveBall();
    drawBola();
    drawRaq();
    drawRaqDois();
    requestAnimationFrame(update);
  }

  update();
}

canvas.addEventListener("click", () => {
  if (started === false) {
    start();
    canvas.requestPointerLock();
  } else {
    canvas.requestPointerLock();
  }
});

draw();
