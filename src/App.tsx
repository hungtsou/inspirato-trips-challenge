import React, { createElement } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return <div>Hello App</div>;
};

const container: HTMLElement | null = document.getElementById("root");
if (!container) throw new Error("no container to render to");

const root = createRoot(container);
root.render(createElement(App));
