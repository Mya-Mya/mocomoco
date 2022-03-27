import { atom } from "recoil";

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
