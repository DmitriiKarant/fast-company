import React from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

import "./index.css";
import App from "./app/App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);

reportWebVitals();
