import ReactDOM from "react-dom";
import React from "react";
import "./styles.scss";

function App() {
  return (
    <div>
      <h1>Hello, wsadorld!</h1>
    </div>
  );
}

if (typeof document !== "undefined") {
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
}
if (module.hot) {
  module.hot.accept();
}
