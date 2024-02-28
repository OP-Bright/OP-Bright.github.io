/*
 * TODO 4: Create a modularized index.js,
 * pass in window and createjs
 */
(function (window, createjs) {
  // TODO 5: Initialize CreateJS //
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  // TODO 6: Set the framerate of the Ticker
  createjs.Ticker.framerate = 60;

  /*
   * TODO 7:CREATE AND CONFIGURE ANY DISPLAY
   * OBJECTS AND ADD THEM TO THE DISPLAY LIST HERE
   */

  // INIT CREATEJS //

  const radius = 25;
  const margin = 100;
  const circle1 = new createjs.Shape();
  const circle2 = new createjs.Shape();
  const circle3 = new createjs.Shape();
  const container = new createjs.Container();
  const slowContainer = new createjs.Container();
  container.x = canvas.width / 2;
  container.y = canvas.height / 2;
  slowContainer.x = canvas.width / 2;
  slowContainer.y = canvas.height / 2;

  // CREATE A BACKGROUND //

  const background = new createjs.Shape();
  background.graphics
    .beginFill("navy")
    .drawRect(0, 0, canvas.height, canvas.width);

  // CREATE A CIRCLE //

  circle1.graphics.beginFill("white").drawCircle(0, 0, radius);
  circle2.graphics.beginFill("royalblue").drawCircle(0, 0, radius + 10);
  circle3.graphics.beginFill("skyblue").drawCircle(0, 0, radius - 10);

  circle1.x = 1;
  circle2.x = 200;
  circle1.y = circle2.y = 1;
  circle3.x = 50;
  circle3.y = 100;

  // ADD DISPLAY OBJECTS TO STAGE //

  container.addChild(circle1, circle2);
  slowContainer.addChild(circle3);
  stage.addChild(background, container, slowContainer);

  // TODO 8: Listen to the 'tick' event  //

  let tickHandler = createjs.Ticker.on("tick", onTick);

  // TODO 9: Handle the 'tick' event //
  function onTick(event) {
    update(event);
  }

  /*
   * TODO 10: Implement an update Function, after making
   * changes to assets, it must call stage.update();
   */

  function update(event) {
    container.rotation += 2;
    slowContainer.rotation += 1;
    container.y -= 10;
    slowContainer.y -= 10;
    if (container.y < -200) {
      container.y = canvas.height + 200;
    }
    if (slowContainer.y < -200) {
      slowContainer.y = canvas.height + 200;
    }
    stage.update();
  }
})(window, window.createjs);
