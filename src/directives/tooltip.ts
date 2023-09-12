/**  {
 * modifiers '.top' | '.bottom' | '.left' | '.right';
 * arg ':arrow'
 */

import "../assets/tooltip.css";
export const createTooltip = {
  created(el: HTMLElement, binding: any) {
    if (typeof binding.value === "string") {
      el.setAttribute("data-v-tooltip", binding.value);
    }

    if (typeof binding.arg !== undefined && binding.arg === "arrow") {
      el.style.setProperty("--v-tooltip-arrow-display", "inline");
    }

    for (const [key, __value] of Object.entries(binding.modifiers)) {
      switch (key) {
        case "top":
          el.style.setProperty("--v-tooltip-left", "50%");
          el.style.setProperty("--v-tooltip-top", "0%");
          el.style.setProperty(
            "--v-tooltip-translate",
            "translate(-50%, -110%)"
          );
          if (typeof binding.arg !== undefined && binding.arg === "arrow") {
            el.style.setProperty(
              "--v-tooltip-arrow-border-color",
              "var(--v-tooltip-background-color) transparent transparent transparent"
            );
            el.style.setProperty(
              "--v-tooltip-arrow-top",
              "calc(var(--v-tooltip-top) - var(--v-tooltip-top-offset) + 8px)"
            );
          }
          break;
        case "bottom":
          el.style.setProperty("--v-tooltip-left", "50%");
          el.style.setProperty("--v-tooltip-top", "105%");
          el.style.setProperty("--v-tooltip-translate", "translate(-50%, 17%)");
          if (typeof binding.arg !== undefined && binding.arg === "arrow") {
            el.style.setProperty(
              "--v-tooltip-arrow-border-color",
              "transparent transparent var(--v-tooltip-background-color) transparent"
            );
            el.style.setProperty(
              "--v-tooltip-arrow-top",
              "calc(var(--v-tooltip-top) - var(--v-tooltip-top-offset) - 5px)"
            );
          }
          break;
        case "left":
          el.style.setProperty("--v-tooltip-left", "0%");
          el.style.setProperty("--v-tooltip-top", "50%");
          el.style.setProperty(
            "--v-tooltip-translate",
            "translate(-107%, -50%)"
          );
          if (typeof binding.arg !== undefined && binding.arg === "arrow") {
            el.style.setProperty(
              "--v-tooltip-arrow-border-color",
              "transparent transparent transparent var(--v-tooltip-background-color)"
            );
            el.style.setProperty(
              "--v-tooltip-arrow-top",
              "calc(var(--v-tooltip-top)"
            );
            el.style.setProperty(
              "--v-tooltip-arrow-left",
              "calc( var(--v-tooltip-left) - var(--v-tooltip-left-offset) + 0.4px)"
            );
          }
          break;
        case "right":
          el.style.setProperty("--v-tooltip-left", "100%");
          el.style.setProperty("--v-tooltip-top", "50%");
          el.style.setProperty("--v-tooltip-translate", "translate(6%, -50%)");
          if (typeof binding.arg !== undefined && binding.arg === "arrow") {
            el.style.setProperty(
              "--v-tooltip-arrow-border-color",
              "transparent var(--v-tooltip-background-color) transparent  transparent"
            );
            el.style.setProperty(
              "--v-tooltip-arrow-top",
              "calc(var(--v-tooltip-top)"
            );
            el.style.setProperty(
              "--v-tooltip-arrow-left",
              "calc( var(--v-tooltip-left) - var(--v-tooltip-left-offset) - 1.5px)"
            );
          }
          break;
        default:
          break;
      }
    }
  },

  mounted(el: HTMLElement, binding: any) {
    if (typeof binding.value === "string") {
      el.classList.add("data-v-tooltip");
    }
    binding.dir.created(el, binding);
  },

  updated(el: HTMLElement, binding: any) {
    binding.dir.created(el, binding);
  },
};
