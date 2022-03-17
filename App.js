import React from "react";
import { NativeBaseProvider } from "native-base";
import { RecoilRoot } from "recoil";
import RooteView from "./src/RooteView";

export default () => (
  <NativeBaseProvider>
    <RecoilRoot>
      <RooteView />
    </RecoilRoot>
  </NativeBaseProvider>
);
