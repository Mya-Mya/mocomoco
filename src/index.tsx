import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import RootView from "./RootView";

ReactDOM.render(
  <RecoilRoot>
    <RootView />
  </RecoilRoot>,
  document.getElementById("root")
);
