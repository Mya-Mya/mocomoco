import { atom } from "recoil";

import { HomeView } from "../scenes/HomeScene";
import { AboutView } from "../scenes/AboutScene";
import { FileEditorView } from "../scenes/FileEditorScene";
import { CreateFileView } from "../scenes/CreateFileScene";
export const SCENES = {
  HOME: <HomeView />,
  ABOUT: <AboutView />,
  FILE_EDITOR: <FileEditorView />,
  CREATE_FILE: <CreateFileView />,
};
export const SCENE_NAMES = {
  HOME: "HOME",
  ABOUT: "ABOUT",
  FILE_EDITOR: "FILE_EDITOR",
  CREATE_FILE: "CREATE_FILE",
};

export default atom({
  key: "sceneState",
  default: SCENE_NAMES.HOME,
});
