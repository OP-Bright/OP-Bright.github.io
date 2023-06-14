/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "w": 87,
    "s": 83,
    "a": 65,
    "d": 68,
    "shift": 16
  }
  var posistionX = 0;
  var posistionY = 0;
  var speedX = 0;
  var speedY = 0

  // Game Item Objects

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);    
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveWalker();
    redrawWalker();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown (event) {
      if (event.shiftKey === true) {
        if (event.which === KEY.w) {
          speedY = -12 
        }
        if (event.which === KEY.s) {
          speedY = 12 
        }
        if (event.which === KEY.a) {
          speedX = -12 
        }
        if (event.which === KEY.d) {
          speedX = 12 
        }
      } else {
        if (event.which === KEY.w) {
          speedY = -7 
        }
        if (event.which === KEY.s) {
          speedY = 7 
        }
        if (event.which === KEY.a) {
          speedX = -7 
        }
        if (event.which === KEY.d) {
          speedX = 7 
        }
      }
  }
  function handleKeyUp (event) {
    if (event.which === KEY.w) {
      speedY = 0
    }
    if (event.which === KEY.s) {
      speedY = 0
    }
    if (event.which === KEY.a) {
      speedX = 0
    }
    if (event.which === KEY.d) {
      speedX = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function moveWalker(){
    posistionX += speedX;
    posistionY += speedY;
  }
  function redrawWalker(){
    $("#walker").css("left", posistionX)
    $("#walker").css("top", posistionY)
  }
  
}
