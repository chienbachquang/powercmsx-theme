var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class Collapse {
  constructor({ element, options = {} }) {
    __publicField(this, "container");
    __publicField(this, "trigger");
    __publicField(this, "isOpen");
    __publicField(this, "onToggle");
    var _a;
    this.container = element;
    this.trigger = (_a = this.container) == null ? void 0 : _a.querySelector('[data-js="collapse_trigger"]');
    this.isOpen = options.initialExpanded || false;
    this.onToggle = options.onToggle;
    this.init();
  }
  init() {
    var _a, _b, _c;
    (_a = this.trigger) == null ? void 0 : _a.setAttribute("aria-expanded", this.isOpen.toString());
    if (this.isOpen) {
      (_b = this.container) == null ? void 0 : _b.classList.add("is-expanded");
    }
    (_c = this.trigger) == null ? void 0 : _c.addEventListener("click", () => this.toggle());
  }
  toggle() {
    this.isOpen ? this.collapse() : this.expand();
  }
  expand() {
    var _a, _b;
    this.isOpen = true;
    (_a = this.container) == null ? void 0 : _a.classList.add("is-expanded");
    (_b = this.trigger) == null ? void 0 : _b.setAttribute("aria-expanded", "true");
    if (this.onToggle) this.onToggle(true);
  }
  collapse() {
    var _a, _b;
    this.isOpen = false;
    (_a = this.container) == null ? void 0 : _a.classList.remove("is-expanded");
    (_b = this.trigger) == null ? void 0 : _b.setAttribute("aria-expanded", "false");
    if (this.onToggle) this.onToggle(false);
  }
  get expanded() {
    return this.isOpen;
  }
}
class ContactAccordion {
  constructor() {
    __publicField(this, "elements");
    this.elements = document.querySelectorAll(".js-contact-accordion");
    this.init();
  }
  init() {
    if (this.elements && this.elements.length > 0) {
      this.elements.forEach((element) => {
        new Component.Collapse({
          element,
          options: {
            initialExpanded: element.classList.contains("is-expanded")
          }
        });
      });
    }
  }
}
(function(global) {
  global.Component = global.Component || {};
  global.Component.Collapse = Collapse;
  global.Component.ContactAccordion = ContactAccordion;
})(window);
function main() {
  new ContactAccordion();
}
document.addEventListener("DOMContentLoaded", () => {
  main();
});
