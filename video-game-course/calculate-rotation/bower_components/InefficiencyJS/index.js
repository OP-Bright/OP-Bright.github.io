// Implementation of makeBody() //

(function(window, _) {
  window.inefficiencyJS = window.inefficiencyJS || {
    numz: {
      /**
       * @param {Object} pointA: An object, should have an x and y key.
       * @param {Object} pointB: An object, should have an x and y key.
       * @returns {Number} Angle in degrees between point A and point B.
       */
      getAngleDegrees: function (pointA, pointB) {
        const distanceX = pointB.x - pointA.x;
        const distanceY = pointB.y - pointA.y;
        const radians = Math.atan2(distanceY, distanceX);
        const degrees = radians * 180 / Math.PI;
        return degrees;
      },
      /**
      * @param {Number} degrees: A number in degrees.
      * @returns {Number} the number you provided, converted to Radians.
      */
      degreesToRadians: function (degrees) {
        return degrees * Math.PI / 180;
      },
      /**
      * @param {Number} radians: A number in radians.
      * @returns {Number} the number you provided, converted to Degrees.
      */
      radiansToDegrees: function (radians) {
        return radians * 180 / Math.PI
      },
    },
    phyz: {
      /**
       * Returns an Object with basic properties utilized in a 
       * 2D physics system. On top of simple physical properties,
       * the body has template methods handleCollision() and update().
       * 
       * @param {String} type: A String, should be unique to your
       * system, representing the type of body.
       * @param {Object} options.
       * @param {Number} options.velocityX: The body's velocity on the x axis.
       * @param {Number} options.velocityY: The body's velocity on the y axis.
       * @param {Number} options.rotationalVelocity: The body's rotational velocity.
       * @param {Number} options.integrity: The body's integrity. 0 means the 
       * body is no longer intact and should explode or break apart, 1 means 
       * the body is fully intact.
       * @param {Number} options.density: The density of the body, can be 
       * used when calculating the force of impact of a collision, which can 
       * then be distributed to affect the kinetic energy of the colliding bodies.
       * @param {Number} options.volatility: The body's volatility, how unstable or
       * explosive it may be. Can be used as a multiplyer when calculating the 
       * force of impact of a collision.
       * @return {Object} The body.
       */
      makeBody: function(type, {
        velocityX = 0,
        velocityY = 0,
        rotationalVelocity = 0,
        integrity = 1,
        density = 1,
        volatility = 0
      } = {}) {
        if (type === undefined) throw new Error('You must provide a valid String for the type parameter!');
        return {
          type: type,
          velocityX: velocityX,
          velocityY: velocityY,
          rotationalVelocity: rotationalVelocity,
          integrity: integrity,
          density: density,
          volatility: volatility,

          /**
           * @param {Number} A number representing the force of the impact.
           * @param {Object} The other body involved in the collision.
           */
          handleCollision(impact, body) {
            // template method //
          },

          /**
           * Can be overridden in the concrete body to provide a custom update()
           * method.
           */
          update(event) {
            // template method //
          }
        };
      },
      /**
       * Calculates the distance between two points.
       * @param {Object} pointA - the first point
       * @param {number} pointA.x - the x value of point A
       * @param {number} pointA.y - the y value of point A
       * @param {Object} pointB - the second point
       * @param {number} pointB.x - the x value of point A
       * @param {number} pointB.y - the y value of point A
       * @returns {number} the distance between the two points.
       */
      calculateDistance: function(pointA, pointB) {
        const distanceX = pointB.x - pointA.x
        const distanceY = pointB.y - pointA.y
        const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
        return distance;
      }
    },
  };
}(window, window._));

