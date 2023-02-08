import React from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

import "./index.css";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);

const store = createStore();

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    </BrowserRouter>
);

reportWebVitals();
