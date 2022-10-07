import { Web3ReactProvider } from "@web3-react/core";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import { provider } from "web3-core";

import App from "./App";

function getLibrary(provider: provider) {
  return new Web3(provider);
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </StrictMode>,
  rootElement
);