/**
 * touch.js — Contrôles tactiles pour mobile
 *
 * On simule exactement les mêmes événements keydown/keyup
 * que le clavier, via l'objet keysPressed déjà géré dans main.js.
 * Aucune modification de man.js ou main.js nécessaire.
 *
 * Chargé en dernier (après main.js) pour accéder à keysPressed.
 */

(function initTouchControls() {
  const btnUp    = document.querySelector("#btn-up");
  const btnDown  = document.querySelector("#btn-down");
  const btnLeft  = document.querySelector("#btn-left");
  const btnRight = document.querySelector("#btn-right");

  if (!btnUp || !btnDown || !btnLeft || !btnRight) return;

  const map = [
    { btn: btnUp,    code: "ArrowUp"    },
    { btn: btnDown,  code: "ArrowDown"  },
    { btn: btnLeft,  code: "ArrowLeft"  },
    { btn: btnRight, code: "ArrowRight" },
  ];

  map.forEach(({ btn, code }) => {
    // Pression → active la touche
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();               // empêche scroll / zoom
      keysPressed[code] = true;
      lastActivityTime = Date.now();    // anti-inactivité
    }, { passive: false });

    // Relâchement → désactive la touche
    btn.addEventListener("touchend", (e) => {
      e.preventDefault();
      keysPressed[code] = false;
    }, { passive: false });

    // Sécurité : si le doigt glisse hors du bouton
    btn.addEventListener("touchcancel", () => {
      keysPressed[code] = false;
    });

    // Support souris pour tester sur desktop
    btn.addEventListener("mousedown", () => {
      keysPressed[code] = true;
      lastActivityTime = Date.now();
    });
    btn.addEventListener("mouseup",   () => { keysPressed[code] = false; });
    btn.addEventListener("mouseleave",() => { keysPressed[code] = false; });
  });
})();
