/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/plugin.js TAP plugin() - array of import map maps - should replace import statements with CDN URLs > array of maps 1`] = `
// fixtures/modules/simple/main.js
import { firstElement } from "https://cdn.eik.dev/something/v666";

// fixtures/modules/simple/utils/dom.js
function replaceElement(target, element) {
  target.replaceWith(element);
  return element;
}

// fixtures/modules/simple/app/views.js
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
function view(items) {
  return html\`<p>Hello \${items[0]}!</p>\`;
}

// fixtures/modules/simple/data/data.js
function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function data() {
  return [
    random(0, 20),
    random(20, 40),
    random(40, 60),
    random(60, 80),
    random(80, 100)
  ];
}

// fixtures/modules/simple/app/app.js
var App = class {
  constructor(root) {
    this.root = root;
  }
  render() {
    const items = data();
    const el = view(items);
    this.root = replaceElement(this.root, el);
  }
  update() {
    setInterval(() => {
      this.render();
    }, 1e3);
  }
};

// fixtures/modules/simple/main.js
var ready = () => {
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {
      const el = document.getElementById("app");
      resolve(firstElement(el));
    });
  });
};
var start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};
start();

`

exports[`test/plugin.js TAP plugin() - basic module - should replace lit-element with CDN URL > basic example 1`] = `
// fixtures/modules/basic/main.js
import { html } from "https://cdn.eik.dev/lit-element/v2";
var render = (world) => {
  return html\`<p>Hello \${world}!</p>\`;
};
render();

`

exports[`test/plugin.js TAP plugin() - import map maps address to a relative path - should replace import statement with relative path > non bare imports 1`] = `
// fixtures/modules/simple/utils/dom.js
function replaceElement(target, element) {
  target.replaceWith(element);
  return element;
}
function firstElement(element) {
  return element.firstElementChild;
}

// fixtures/modules/simple/app/views.js
import { html, css } from "./lit-element/v2";
function view(items) {
  return html\`<p>Hello \${items[0]}!</p>\`;
}

// fixtures/modules/simple/data/data.js
function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function data() {
  return [
    random(0, 20),
    random(20, 40),
    random(40, 60),
    random(60, 80),
    random(80, 100)
  ];
}

// fixtures/modules/simple/app/app.js
var App = class {
  constructor(root) {
    this.root = root;
  }
  render() {
    const items = data();
    const el = view(items);
    this.root = replaceElement(this.root, el);
  }
  update() {
    setInterval(() => {
      this.render();
    }, 1e3);
  }
};

// fixtures/modules/simple/main.js
var ready = () => {
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {
      const el = document.getElementById("app");
      resolve(firstElement(el));
    });
  });
};
var start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};
start();

`

exports[`test/plugin.js TAP plugin() - import map maps non bare imports - should replace import statement with CDN URL > non bare imports 1`] = `
// fixtures/modules/simple/main.js
import { firstElement } from "https://cdn.eik.dev/something/v666";

// fixtures/modules/simple/utils/dom.js
function replaceElement(target, element) {
  target.replaceWith(element);
  return element;
}

// fixtures/modules/simple/app/views.js
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
function view(items) {
  return html\`<p>Hello \${items[0]}!</p>\`;
}

// fixtures/modules/simple/data/data.js
function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function data() {
  return [
    random(0, 20),
    random(20, 40),
    random(40, 60),
    random(60, 80),
    random(80, 100)
  ];
}

// fixtures/modules/simple/app/app.js
var App = class {
  constructor(root) {
    this.root = root;
  }
  render() {
    const items = data();
    const el = view(items);
    this.root = replaceElement(this.root, el);
  }
  update() {
    setInterval(() => {
      this.render();
    }, 1e3);
  }
};

// fixtures/modules/simple/main.js
var ready = () => {
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {
      const el = document.getElementById("app");
      resolve(firstElement(el));
    });
  });
};
var start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};
start();

`

exports[`test/plugin.js TAP plugin() - import specifier is a interior package path - should replace with CDN URL > interior package path 1`] = `
// fixtures/modules/simple/utils/dom.js
function replaceElement(target, element) {
  target.replaceWith(element);
  return element;
}
function firstElement(element) {
  return element.firstElementChild;
}

// fixtures/modules/simple/app/views.js
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
function view(items) {
  return html\`<p>Hello \${items[0]}!</p>\`;
}

// fixtures/modules/simple/data/data.js
function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function data() {
  return [
    random(0, 20),
    random(20, 40),
    random(40, 60),
    random(60, 80),
    random(80, 100)
  ];
}

// fixtures/modules/simple/app/app.js
var App = class {
  constructor(root) {
    this.root = root;
  }
  render() {
    const items = data();
    const el = view(items);
    this.root = replaceElement(this.root, el);
  }
  update() {
    setInterval(() => {
      this.render();
    }, 1e3);
  }
};

// fixtures/modules/simple/main.js
var ready = () => {
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {
      const el = document.getElementById("app");
      resolve(firstElement(el));
    });
  });
};
var start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};
start();

`

exports[`test/plugin.js TAP plugin() - input is a filepath to a map file - should load map and replace import statements with CDN URLs > non bare imports 1`] = `
// fixtures/modules/simple/utils/dom.js
function replaceElement(target, element) {
  target.replaceWith(element);
  return element;
}
function firstElement(element) {
  return element.firstElementChild;
}

// fixtures/modules/simple/app/views.js
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
function view(items) {
  return html\`<p>Hello \${items[0]}!</p>\`;
}

// fixtures/modules/simple/data/data.js
function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function data() {
  return [
    random(0, 20),
    random(20, 40),
    random(40, 60),
    random(60, 80),
    random(80, 100)
  ];
}

// fixtures/modules/simple/app/app.js
var App = class {
  constructor(root) {
    this.root = root;
  }
  render() {
    const items = data();
    const el = view(items);
    this.root = replaceElement(this.root, el);
  }
  update() {
    setInterval(() => {
      this.render();
    }, 1e3);
  }
};

// fixtures/modules/simple/main.js
var ready = () => {
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {
      const el = document.getElementById("app");
      resolve(firstElement(el));
    });
  });
};
var start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};
start();

`

exports[`test/plugin.js TAP plugin() - input is a filepath to a map file and an inline map - should load map and replace import statements with CDN URLs > non bare imports 1`] = `
// fixtures/modules/simple/main.js
import { firstElement } from "https://cdn.eik.dev/something/v666";

// fixtures/modules/simple/utils/dom.js
function replaceElement(target, element) {
  target.replaceWith(element);
  return element;
}

// fixtures/modules/simple/app/views.js
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
function view(items) {
  return html\`<p>Hello \${items[0]}!</p>\`;
}

// fixtures/modules/simple/data/data.js
function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function data() {
  return [
    random(0, 20),
    random(20, 40),
    random(40, 60),
    random(60, 80),
    random(80, 100)
  ];
}

// fixtures/modules/simple/app/app.js
var App = class {
  constructor(root) {
    this.root = root;
  }
  render() {
    const items = data();
    const el = view(items);
    this.root = replaceElement(this.root, el);
  }
  update() {
    setInterval(() => {
      this.render();
    }, 1e3);
  }
};

// fixtures/modules/simple/main.js
var ready = () => {
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {
      const el = document.getElementById("app");
      resolve(firstElement(el));
    });
  });
};
var start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};
start();

`

exports[`test/plugin.js TAP plugin() - simple module - should replace lit-element with CDN URL > simple example 1`] = `
// fixtures/modules/simple/utils/dom.js
function replaceElement(target, element) {
  target.replaceWith(element);
  return element;
}
function firstElement(element) {
  return element.firstElementChild;
}

// fixtures/modules/simple/app/views.js
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
function view(items) {
  return html\`<p>Hello \${items[0]}!</p>\`;
}

// fixtures/modules/simple/data/data.js
function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function data() {
  return [
    random(0, 20),
    random(20, 40),
    random(40, 60),
    random(60, 80),
    random(80, 100)
  ];
}

// fixtures/modules/simple/app/app.js
var App = class {
  constructor(root) {
    this.root = root;
  }
  render() {
    const items = data();
    const el = view(items);
    this.root = replaceElement(this.root, el);
  }
  update() {
    setInterval(() => {
      this.render();
    }, 1e3);
  }
};

// fixtures/modules/simple/main.js
var ready = () => {
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {
      const el = document.getElementById("app");
      resolve(firstElement(el));
    });
  });
};
var start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};
start();

`
