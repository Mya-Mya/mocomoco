import React, { useEffect } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import editingFileIdState from "./states/editingFileIdState";
import sceneState, { SCENES, SCENE_NAMES } from "./states/sceneState";
import * as filesStates from "./states/filesStates";
export default () => {
  const scene = useRecoilValue(sceneState);
  const sceneDOM = SCENES[scene];

  const setScene = useSetRecoilState(sceneState);
  const setEditingFileId = useSetRecoilState(editingFileIdState);
  const fileIds = useRecoilValueLoadable(filesStates.fileIdsState);
  /*useEffect(() => {
    const fileId = (fileIds.valueMaybe() || [])[0];
    setEditingFileId(fileId);
    setScene(SCENE_NAMES.FILE_EDITOR);
  }, [fileIds]);*/
  return <>{sceneDOM}</>;
};
