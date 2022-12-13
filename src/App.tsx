import { createElement } from "react";
import { createRoot } from "react-dom/client";
import Pages from "./pages";

const App = () => {
  return (
    <div>
      <Pages />
    </div>
  );
};

const container: HTMLElement | null = document.getElementById("root");
if (!container) throw new Error("no container to render to");

const root = createRoot(container);
root.render(createElement(App));
