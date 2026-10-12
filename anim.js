// Лёгкие анимации на встроенном Web Animations API, без внешних библиотек.
(function () {
  const reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function run(el, keyframes, options) {
    if (!el || reduceMotion || !el.animate) return null;
    return el.animate(keyframes, Object.assign({
      duration: 420,
      easing: "cubic-bezier(.2,.8,.2,1)",
      fill: "both",
    }, options));
  }

  window.Anim = {
    fadeUp(el, delay = 0) {
      return run(el,
        [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }],
        { delay });
    },
    stagger(elements, step = 50, base = 0) {
      elements.forEach((el, i) => window.Anim.fadeUp(el, base + i * step));
    },
    press(el) {
      return run(el,
        [{ transform: "scale(1)" }, { transform: "scale(.96)" }, { transform: "scale(1)" }],
        { duration: 200 });
    },
    pop(el) {
      return run(el,
        [{ transform: "scale(.9)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }],
        { duration: 320 });
    },
    shake(el) {
      return run(el,
        [
          { transform: "translateX(0)" }, { transform: "translateX(-7px)" },
          { transform: "translateX(7px)" }, { transform: "translateX(-4px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 360 });
    },
    success(el) {
      return run(el,
        [{ transform: "scale(1)" }, { transform: "scale(1.05)" }, { transform: "scale(1)" }],
        { duration: 500 });
    },
  };
})();
