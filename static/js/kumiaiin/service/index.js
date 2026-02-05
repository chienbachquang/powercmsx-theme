var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
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
(function(global) {
  global.Component = global.Component || {};
  global.Component.Collapse = Collapse;
})(window);
function main() {
  const contactAccordions = document.querySelectorAll(".js-contact-accordion");
  contactAccordions.forEach((element) => {
    new Component.Collapse({
      element,
      options: {
        initialExpanded: element.classList.contains("is-expanded")
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  main();
});
