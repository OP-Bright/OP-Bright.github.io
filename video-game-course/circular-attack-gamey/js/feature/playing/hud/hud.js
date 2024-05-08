(function (window, createjs, opspark, _) {
  const draw = opspark.draw,
    layout = opspark.factory.component.layout;

  // create a namespace for the hud //
  _.set(opspark, "playa.hud", function (game, messenger) {
    const canvas = game.canvas;

    const huds = layout({ direction: "VERTICAL", padding: 4 });
    game.hud.addChild(huds);
    let active = [];

    function activate() {
      messenger.on("SPAWN", onSpawn);
      return this;
    }

    function deactivate() {
      messenger.off("SPAWN", onSpawn);
      return this;
    }

    function destroy() {
      deactivate();
      game.hud.removeChild(huds);
      active = null;
    }

    function onSpawn(event) {
      //console.log({ event });
      switch (event.source) {
        case "ship":
          const hud = makeHud(_.first(_.get(event, "bodies")))[0];
          const hp = makeHud(_.first(_.get(event, "bodies")))[1];
          console.log({ hud, hp });
          active.push(hud, hp);
          huds.add(hud, hp);
          break;

        /* case "orb":
          active.forEach((hud) =>
            event.bodies.forEach((orb) => hud.updateOf(orb.radius))
          );
          break; */

        default:
        // code
      }
    }

    function makeHud(ship) {
      const hud = new createjs.Container();

      let score = 0,
        of = 0;

      const txtScore = draw.textfield(
          "SCORE : 000",
          "19px Arial",
          "#666",
          "left"
        ),
        integrity = new createjs.Container(),
        background = draw.rect(104, 20, "#CCC"),
        integrityMeter = draw.rect(100, 16, ship.color || "#3333CC");

      draw.rect(102, 18, "#FFF", null, null, 1, 1, background);

      // add all view components to their containers in the correct order //
      integrity.addChild(background, integrityMeter);
      hud.addChild(txtScore);

      /**
       * Called when the asset is added to the stage.
       * Use render() to config and position components.
       */
      function render() {
        integrityMeter.x = integrityMeter.y = 2;
        integrity.x = txtScore.getBounds().width + 4;

        integrity.x = ship.x - 50
        integrity.y = ship.y - 60

        hud.x = canvas.width - txtScore.getBounds().width - 20;
        hud.y = 10;
      }

      messenger.on("MoveHud", render);

      //TODO ROWAN - Make the Hud follow the player (ideally just the HP, not the score.)

      // setup a one-time added-to-parent listener //
      hud.on("added", onAdded);
      integrity.on("added", onAdded);

      function onAdded(event) {
        if (game.getDebug()) console.log("hud added to stage");
        hud.off("added", onAdded);
        render();
      }

      hud.updateScore = function (value) {
        score += value;
        txtScore.text = "SCORE : " + score + " / " + of;
        // the text width may have changed, so update the position //
        render();
      };

      hud.updateOf = function (value) {
        of += value;
        txtScore.text = "SCORE : " + score + " / " + of;
        // the text width may have changed, so update the position //
        render();
      };

      integrity.setIntegrity = function (value) {
        if (value > -1 && value < 101) {
          createjs.Tween.get(integrityMeter).to({ scaleX: value }, 400);
          if (value === 0) integrity.kill();
        }
      };

      integrity.kill = function () {
        createjs.Tween.get(integrityMeter).to({ alpha: 0 }, 1000);
      };

      messenger.on("EXPLOSION", onExplosion);
      function onExplosion(event) {
        switch (event.source) {
          case "orb":
            if (event.incoming.emitter === ship)
              hud.updateScore(event.target.radius);
            break;
          case "ship":
            if (event.target === ship) integrity.setIntegrity(0);
            break;
        }
      }

      messenger.on("DAMAGE", onDamage);
      function onDamage(event) {
        if (event.target === ship) {
          integrity.setIntegrity(ship.integrity);
        }
      }

      return [hud, integrity];
    }

    return {
      // called on screen resize //
      liquify() {
        return createjs.Tween.get(huds, { loop: false }).to(
          { x: canvas.width - huds.getBounds().width - 2 },
          700,
          createjs.Ease.getPowInOut(4)
        );
      },
      activate,
      deactivate,
      destroy,
    };
  });
})(window, window.createjs, window.opspark, window._);
