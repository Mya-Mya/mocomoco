import React from "react";
import { useRecoilValue } from "recoil";
import { AboutView } from "./scenes/AboutScene";
import { CreateFileView } from "./scenes/CreateFileScene";
import { FileEditorView } from "./scenes/FileEditorScene";
import { HomeView } from "./scenes/Home/HomeView";
import sceneState, { SCENE_NAMES } from "./states/sceneState";
//import { Routes, Route, BrowserRouter } from "react-router-dom";

export default () => {
  const scene = useRecoilValue(sceneState);
  switch (scene) {
    case SCENE_NAMES.HOME:
      return <HomeView />;
    case SCENE_NAMES.ABOUT:
      return <AboutView />;
    case SCENE_NAMES.FILE_EDITOR:
      return <FileEditorView />;
    case SCENE_NAMES.CREATE_FILE:
      return <CreateFileView />;
  }
  return <div>{scene}</div>;
};
