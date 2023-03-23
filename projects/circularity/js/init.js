var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables

        var circle; //variable for single circle
        
        var circles = []; //this makes it an empty array.

        // TODO 2 : Create a function that draws a circle 
        
        function drawCircle () {
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
            physikz.addRandomVelocity(circle, canvas);
            view.addChild(circle);
            circles.push(circle);
        }

        // TODO 3 / 7 : Call the drawCircle() function 

       /* drawCircle();
        drawCircle();
        drawCircle();
        drawCircle();
        drawCircle(); */

        //draws 100 circles
        var finishedLoops = 0;
        while (finishedLoops < 101) {
            drawCircle();
            finishedLoops++
        }


        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //

            /* physikz.updatePosition(circles[0]);
            physikz.updatePosition(circles[1]);
            physikz.updatePosition(circles[2]);
            physikz.updatePosition(circles[3]);
            physikz.updatePosition(circles[4]); */
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
           
            /* game.checkCirclePosition(circles[0]);
            game.checkCirclePosition(circles[1]);
            game.checkCirclePosition(circles[2]);
            game.checkCirclePosition(circles[3]);
            game.checkCirclePosition(circles[4]); */
            // commented out due to inefficiency. no need to hardcode those values, it would take forever to do all 100

            // TODO 9 : Iterate over the array

            for (var eachCircle = 0; eachCircle < circles.length; eachCircle++) {
                physikz.updatePosition(circles[eachCircle]);
                game.checkCirclePosition(circles[eachCircle]);
            }
            
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if (circle.x > canvas.width + circle.radius) {
                circle.x = 0 - circle.radius;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            
            // if it hits the left side, loops to the right side
            if ( circle.x < 0 - circle.radius) {
                circle.x = canvas.width + circle.radius;
            }

            // if it hits the bottom side, go to the top side
            if ( circle.y > canvas.height + circle.radius) {
                circle.y = 0 - circle.radius;
            }

            // if it hits top side, go to to bottom side
            if ( circle.y < 0 - circle.radius) {
                circle.y = canvas.height + circle.radius;
            }

            //the circle.radius addition/subtraction allows for more smooth transistions.

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
