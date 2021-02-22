import React from "react";

import "./App.css";
import RouteContainer from "./RouteContainer";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouteContainer />
      </Provider>
    </div>
  );
}

export default App;
