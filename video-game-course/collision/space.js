(function(window, opspark, racket, inefficiencyJS) {
  /**
   * Creates and returns the space module. Listens for SPAWN 
   * events, adding any bodies in the event
   * @param {Object} messenger: The system wide event dispatcher.
   */
  opspark.space = function(messenger) {
    // holds all bodies active in our space //
    const 
      dampeningForce = 0.08,
      active = [];

    messenger.on('SPAWN', onSpawn);
    function onSpawn(event) {
      add(...event.bodies);
    }
    
    function add(...bodies) {
      active.push(...bodies);
      return this;
    }

    function remove(body) {
      return active.splice(active.indexOf(body), 1)[0];
    }

    return {
      add,
      remove,
      destroy() {
        messenger.off('SPAWN', onSpawn);
      },
      update(event) {
        active.forEach(body => {
          // ask the body to update its velocity //
          body.update(event);
          
          // update the body's position based on its new velocity //
          racket.physikz.updatePosition(body);
        });

        // loop backwards over each body in the space: note i > 0 //
        for (let i = active.length - 1; i > 0; i--) {
          // pull out each body one by one //
          const bodyA = active[i];

          // compare all other bodies to bodyA, excluding bodyA: note j > -1 //
          hit: for (let j = i - 1; j > -1; j--) {
            const bodyB = active[j];
            
            // TODO 1: Calculate hit test components
            
            const distance = inefficiencyJS.phyz.calculateDistance(bodyA, bodyB);
            const angle = inefficiencyJS.numz.getAngleDegrees(bodyA, bodyB)
            const minimumDistance = bodyA.radius + bodyB.radius;
              
            // TODO 2: Do collision check: how do we know if bodies are colliding?
            if(distance < minimumDistance) {
              // console.log('hit!');
              
              // TODO 3: Calculate springToX and springToY 
              
              const springToX = ((Math.cos(angle) * minimumDistance) + bodyA.x)
              const springToY = ((Math.sin(angle) * minimumDistance) + bodyA.y)
                
              // TODO 4: Calculate acceleration to spring-to point, factor in dampeningForce
              
              const accelerationOnX = ((bodyB.x - springToX) * dampeningForce);
              const accelerationOnY = ((bodyB.y - springToY) * dampeningForce);
              
              // TODO 5: Apply acceleration to bodyB
              
              bodyB.velocityX += accelerationOnX;
              bodyB.velocityY += accelerationOnY;
              
              // TODO 6: Apply inverse acceleration to bodyA
              
              bodyA.velocityX -= accelerationOnX;
              bodyA.velocityY -= accelerationOnY;
              
            }
          }
        }
      }
    };
  };
}(window, window.opspark, window.opspark.racket, window.inefficiencyJS));
