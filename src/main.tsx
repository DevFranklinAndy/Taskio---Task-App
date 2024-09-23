import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { RouterConfig } from "./router/RouterConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ReduxStore } from "./global/ReduxStore";
import { Provider } from "react-redux";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={ReduxStore}>
      <PersistGate persistor={persistStore(ReduxStore)}>
        <RouterProvider router={RouterConfig} />
      </PersistGate>
    </Provider>
    <ToastContainer position="top-center" />
  </React.StrictMode>
);
