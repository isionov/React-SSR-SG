import "babel-polyfill";
import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { renderRoutes } from "react-router-config";

import Routes from "./Routes";

const axiosInstance = axios.create({
  baseURL: "/api",
});
console.log("window.INITIAL_STATE", JSON.parse(window.INITIAL_STATE));
const store = createStore(
  reducers,
  JSON.parse(window.INITIAL_STATE),
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
