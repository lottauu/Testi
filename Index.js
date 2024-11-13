// Canvas

let canvas;

let canvasHeight = 500;

let canvasWidth = 500;

let ctx;



// tiilet

let brickRowCount = 5;

let brickColumnCount = 7;

let brickWidth = 60;

let brickHeight = 20;

let brickPadding = 10;

let brickOffsetTop = 30;

let brickOffsetLeft = 35;



// Tiilien taulukko

let bricks = [];

for (let c = 0; c < brickColumnCount; c++) {

    bricks[c] = [];

    for (let r = 0; r < brickRowCount; r++) {

        bricks[c][r] = { x: 0, y: 0, status: 1 }; 

    }

}



// Piirrä tiilet

function drawBricks() {

    for (let c = 0; c < brickColumnCount; c++) {

        for (let r = 0; r < brickRowCount; r++) {

            if (bricks[c][r].status === 1) { // Piirretään vain näkyvät tiilet

                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;

                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

                bricks[c][r].x = brickX;

                bricks[c][r].y = brickY;



                ctx.fillStyle = "90E0EF";

                ctx.fillRect(brickX, brickY, brickWidth, brickHeight);

                ctx.strokeStyle = "#FFFFFF";

                ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);

            }

        }

    }

}



// Maila

let paddleWidth = 80;

let paddleHeight = 10;

let paddleMovement = 10;



let paddle = {

    x : canvasWidth/2 - paddleWidth/2,

    y : canvasHeight - paddleHeight - 5,

    width : paddleWidth,

    height : paddleHeight,

    move : paddleMovement

}



// Pallo

  let ballWidth = 10;

  let ballHeight = 10;

  let ballVelocityX = 3;

  let ballVelocityY = 2;



  let ball = {

    x: canvasWidth/2,

    y: canvasHeight/2,

    width: ballWidth,

    height: ballHeight,

    velocityX: ballVelocityX,

    velocityY: ballVelocityY

  }



// sivun latautuessa

window.onload = function() {

    canvas = document.getElementById("myCanvas");

    canvas.height = canvasHeight;

    canvas.width = canvasWidth;

    ctx = canvas.getContext("2d");



    //maila alussa

    ctx.fillStyle = "#C7F9CC";

    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)



    //Looppi, joka piirtää jatkuvasti

    requestAnimationFrame(update);



    //mailan liikkumiseen tarvittava eventListener

    document.addEventListener("keydown", movePaddle);

}



//Looppi, joka piirtää jatkuvasti

function update() {

    requestAnimationFrame(update);



    // tyhjennetään canvas

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);



    drawBricks();



    //maila

    ctx.fillStyle = "#C7F9CC";

    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);



    // Pallo

    ctx.fillStyle = "#FCEFB4";

    ball.x += ball.velocityX;

    ball.y += ball.velocityY;

    ctx.fillRect(ball.x, ball.y, ball.width, ball.height)



    if (ball.y <= 0){

      ball.velocityY *= -1;

    }

    else if (ball.x <= 0 || (ball.x + ball.width) >= canvasWidth){

      ball.velocityX *= -1;

    }

    else if (ball.y + ball.height >= canvasHeight) {

      //game over

    }



    // Pompauta pallo

    if (topCollision(ball, paddle) || bottomCollision(ball, paddle)){

      ball.velocityY *= -1;

    }

    else if (leftCollision(ball, paddle) || rightCollision(ball, paddle)){

      ball.velocityX *= -1;

    }

}



// Tarkistetaan, onko maila seinien sisäpuolella

function paddleOutOfCanvas(positionX) {

    return (positionX < 0 || positionX + paddleWidth > canvasWidth);

}



//Mailan liikutus

function movePaddle(e) {

    if (e.code == "ArrowLeft") {

        //paddle.x -= paddle.move;

        let paddleNextPosition = paddle.x - paddle.move;



        // jos maila on pelialueen sisällä, maila liikkuu

        if (!paddleOutOfCanvas(paddleNextPosition)) {

            paddle.x = paddleNextPosition

        }

    }

    if (e.code == "ArrowRight") {

        //paddle.x += paddle.move;

        let paddleNextPosition = paddle.x + paddle.move;



        // jos maila on pelialueen sisällä, maila liikkuu

        if (!paddleOutOfCanvas(paddleNextPosition)) {

            paddle.x = paddleNextPosition

        }

    }

}



 

// Pallon törmäys reunoihin

function detectCollision(a, b){

  return a.x < b.x + b.width &&

    a.x + a.width > b.x &&

    a.y < b.y + b.height &&

    a.y + a.height > b.y;

}



function topCollision(ball, block){

  return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;

}



function rightCollision(ball, block){

  return detectCollision(ball, block) && (block.x + block.width) >= ball.x;

}



function bottomCollision(ball, block){

  return detectCollision(ball, block) && (block.y + block.height) >= ball.y;

}



function leftCollision(ball, block){

  return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;

}
