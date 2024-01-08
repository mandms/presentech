import React from "react";
import ReactDOM from "react-dom/client";
import Theme from './components/ThemeProvider/Theme.tsx';

import './index.css';

import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
        <Theme>
            <App />
        </Theme>
    </Provider>
  </React.StrictMode>,
);
