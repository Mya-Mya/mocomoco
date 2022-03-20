import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Input,
  Heading,
  HStack,
  Button,
  Center,
  Box,
  VStack,
  Spinner,
  Skeleton,
} from "native-base";
import useHTMLEditor from "./useHTMLEditor";
import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from "recoil";
import {
  fileContentState,
  fileIdsState,
  fileNameState,
} from "../states/filesStates";
import sceneState, { SCENE_NAMES } from "../states/sceneState";
export const useCreateFileActions = () => {
  const onBackPress = useRecoilCallback(({ set }) => () => {
    console.log("CreateFile.onBackPress");
    set(sceneState, SCENE_NAMES.HOME);
  });
  const onCreateEmptyFilePress = useRecoilCallback(({ set }) => (fileName) => {
    console.log("CreateFile.onCreateEmptyFilePress");
    const fileId = Date.now();
    set(fileIdsState, (fileIds) => [fileId, ...fileIds]);
    set(fileNameState(fileId), fileName === "" ? "New File" : fileName);
    set(fileContentState(fileId), "");
    set(sceneState, SCENE_NAMES.HOME);
  });
  return { onBackPress, onCreateEmptyFilePress };
};
const importingUrlState = atom({
  key: "CreateFile.importingUrlState",
  default: null,
});
const importingTextContentState = selector({
  key: "CreateFile.importingTextContentState",
  get: async ({ get }) => {
    const url = get(importingUrlState);
    if (url == null) return null;
    return fetch(url)
      .then((res) => res.text())
      .catch((err) => "");
  },
});

export const CreateFileView = () => {
  const actions = useCreateFileActions();
  const [fileName, setFileName] = React.useState("");
  const [importingUrl, setImportingUrl] = useRecoilState(importingUrlState);
  const importingTextContent = useRecoilValueLoadable(
    importingTextContentState
  );

  return (
    <View flex={1} alignItems="center">
      <Center flex={1} padding="3">
        <VStack space="xs">
          <HStack alignItems="center" space="xs">
            <Button variant="outline" onPress={actions.onBackPress}>
              ←
            </Button>
            <Heading size="lg">新しいファイルを作ります</Heading>
          </HStack>
          <Input
            placeholder="ファイル名を書きましょう"
            value={fileName}
            onChangeText={setFileName}
          />
          <Button onPress={() => actions.onCreateEmptyFilePress(fileName)}>
            作成
          </Button>
        </VStack>
      </Center>
    </View>
  );
};
