(function(window, createjs, opspark, _) {

  // Variable declarations for libraries and the game engine
  const
    draw = opspark.draw, // library for drawing using createJS
    physikz = opspark.racket.physikz, // library for defining physics properties like velocity
    engine = opspark.V6().activateResize(), // game engine for actively rendering + running the game's mechanics
    canvas = engine.getCanvas(), // object for referencing the height / width of the window
    stage = engine.getStage(); // object to hold all visual components

  // load some sounds for the demo - play sounds using: createjs.Sound.play("wall");
  createjs.Sound.on("fileload", handleLoadComplete);
  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.registerSounds([{ src: "hit.ogg", id: "hit" }, { src: "wall.ogg", id: "wall" }], "assets/sounds/");

  function handleLoadComplete(event) {
    console.log('sounds loaded');
  }

  engine
    .addTickHandlers(update) // establish the update function as the callback for every timer tick
    .activateTick();

  // Variable declarations for the paddles and the ball which are drawn using createJS (see bower_components/opspark-draw/draw.js)
  const
    paddlePlayer = createPaddle(),
    paddleCPU = createPaddle({ x: canvas.width - 20, y: canvas.height - 100 }),
    ball = draw.circle(20, '#CCC');

  // set initial properties for the paddles 
  paddlePlayer.yVelocity = 0;
  paddleCPU.yVelocity = 6;

  // set initial properties for the ball
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  var randomStart = getRandomInt(2)
  if (randomStart === 0) {
    ball.xVelocity = 5;
    ball.yVelocity = -5;
  }
  if (randomStart === 1) {
    ball.xVelocity = 5;
    ball.yVelocity = 5;
  }

    //Initialize score
    function createScore () {
      return draw.textfield("Score: 0", "20px Times New Roman", "black", "center", "center", (canvas.width/2), (canvas.height - canvas.height/10));
    }
  
    const theScore = createScore();

    stage.addChild(theScore);
  
    let numOfHits = 0

    console.log(theScore)
  
  // add the paddles and the ball to the view
  stage.addChild(paddlePlayer, paddleCPU, ball);


  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('keydown', onKeyDown);

  // when an Arrow key is pressed down, set the paddle in motion
  function onKeyDown(event) {
    if (event.key === 'ArrowUp') {
      paddlePlayer.yVelocity = -5;
    } else if (event.key === 'ArrowDown') {
      paddlePlayer.yVelocity = 5;
    }
  }

  // when either the Arrow Up or Arrow Down key are released, stop the paddle from moving
  function onKeyUp(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      paddlePlayer.yVelocity = 0;
    }
  }

  function update(event) {
    const
      boundsCPU = paddleCPU.getBounds(),
      widthCPU = boundsCPU.width,
      heightCPU = boundsCPU.height,
      midCPU = heightCPU / 2,
      boundsPlayer = paddlePlayer.getBounds(),
      widthPlayer = paddlePlayer.width,
      heightPlayer = paddlePlayer.height;

    // Ball movement: the xVelocity and yVelocity is the distance the ball moves per update
    ball.x = ball.x + ball.xVelocity;
    ball.y = ball.y + ball.yVelocity;

    // Player movement //
    paddlePlayer.y += paddlePlayer.yVelocity;
    if (paddlePlayer.y < 0) {
      paddlePlayer.y = 0;
    }
    if (paddlePlayer.y > canvas.height - paddlePlayer.height) {
      paddlePlayer.y = canvas.height - heightPlayer;
    }

   // AI movement: CPU follows ball //
    if ((paddleCPU.y + midCPU) < (ball.y - 14)) {
      paddleCPU.y += paddleCPU.yVelocity;

// if the middle of the paddle is more than 14 units higher than the ball, beigin to move down.

    } else if ((paddleCPU.y + midCPU) > (ball.y + 14)) {
      paddleCPU.y -= paddleCPU.yVelocity;
    }
  
// if the middle of the paddle is more than 14 units lower than the ball, begin to move down.

//14 is coded in as a sort of measure of sensitivity. lower, and it moves to meet the ball the more it moves. Lower, and it takes
//the ball moving farther for it to move. 

    // TODO 1: bounce the ball off the top

    if (ball.y - 20 < 0)  {
      ball.yVelocity = -ball.yVelocity 
      createjs.Sound.play("wall")
    }

    // TODO 2: bounce the ball off the bottom

    if (ball.y + 20 > canvas.height)  {
      ball.yVelocity = -ball.yVelocity
      createjs.Sound.play("wall")
    }

    // TODO 3: bounce the ball off each of the paddles
    
    ball.topEdge = ball.y + 20
    ball.bottomEdge = ball.y - 20
    ball.leftEdge = ball.x - 20
    ball.rightEdge = ball.x + 20

    /*
    paddlePlayer.topEdge = paddlePlayer.y - 1
    paddlePlayer.bottomEdge = paddlePlayer.y + 101
    paddlePlayer.leftEdge = paddlePlayer.x
    paddlePlayer.rightEdge = paddlePlayer.x + 20

    paddleCPU.topEdge = paddleCPU.y - 1
    paddleCPU.bottomEdge = paddleCPU.y + 101
    paddleCPU.leftEdge = paddleCPU.x
    paddleCPU.rightEdge = paddleCPU.x + 20


    //PLAYER COLLISION//

    //If the ball is not above or below the paddle and hits the right side...
    if (ball.bottomEdge < paddlePlayer.topEdge || ball.topEdge > paddlePlayer.bottomEdge) {

    }
    else if (ball.leftEdge <= paddlePlayer.rightEdge && ball.leftEdge >= paddlePlayer.leftEdge) {
      ball.xVelocity = -ball.xVelocity + 1
      createjs.Sound.play("hit")
      numOfHits += 1;
      theScore.text = "Score: " + numOfHits;
    }

    //CPU COLLISION//

    //If the ball is not above or below the paddle and hits the left side...
    if (ball.bottomEdge < paddleCPU.topEdge || ball.topEdge > paddleCPU.bottomEdge) {

    }
    else if (ball.rightEdge >= paddleCPU.leftEdge && ball.rightEdge <= paddleCPU.rightEdge) {
      ball.xVelocity = -ball.xVelocity - 1
      createjs.Sound.play("hit");
    }
    */

    function detectCollision (paddle) {
      paddle.topEdge = paddle.y - 1
      paddle.bottomEdge = paddle.y + 101
      paddle.leftEdge = paddle.x
      paddle.rightEdge = paddle.x + 20

      if (ball.bottomEdge < paddle.topEdge || ball.topEdge > paddle.bottomEdge) {

      } else if (ball.leftEdge <= paddle.rightEdge && ball.leftEdge >= paddle.leftEdge) {
        ball.xVelocity = -ball.xVelocity + 1
        createjs.Sound.play("hit")
        if (paddle === paddlePlayer) {
          numOfHits += 1;
          theScore.text = "Score: " + numOfHits;
        }
      } else if (ball.rightEdge >= paddle.leftEdge && ball.rightEdge <= paddle.rightEdge) {
        ball.xVelocity = -ball.xVelocity - 1
        createjs.Sound.play("hit");
      }
    }

    detectCollision(paddlePlayer);
    detectCollision(paddleCPU);
    
    //RESET CODE
    if (ball.rightEdge < 0 || ball.leftEdge > canvas.width) {
      createjs.Sound.play("wall");
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      var randomStart = getRandomInt(2)
      if (randomStart === 0) {
        ball.xVelocity = 5;
        ball.yVelocity = -5;
      }
      if (randomStart === 1) {
        ball.xVelocity = 5;
        ball.yVelocity = 5;
      }
    }

  }



  // helper function that wraps the draw.rect function for easy paddle making
  function createPaddle({ width = 20, height = 100, x = 0, y = 0, color = '#CCC' } = {}) {
    const paddle = draw.rect(width, height, color);
    paddle.x = x;
    paddle.y = y;
    return paddle;
  }

  console.log(engine);
  console.log (canvas);
  console.log (canvas + 4);
  console.log (HTMLCanvasElement)

}(window, window.createjs, window.opspark, window._));

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
//THANKS MDN WEB DOCS