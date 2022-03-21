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
  TextArea,
} from "native-base";
import useHTMLEditor from "./useHTMLEditor";
import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import {
  fileContentState,
  fileIdsState,
  fileNameState,
} from "../states/filesStates";
import * as examplehtmlsStates from "../states/examplehtmlsStates";
import sceneState, { SCENE_NAMES } from "../states/sceneState";
export const useCreateFileActions = () => {
  const onBackPress = useRecoilCallback(({ set }) => () => {
    console.log("CreateFile.onBackPress");
    set(sceneState, SCENE_NAMES.HOME);
  });
  const onCreateEmptyFilePress = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        console.log("CreateFile.onCreateEmptyFilePress");
        const fileName = await snapshot.getPromise(editingFileNameState);
        const fileId = Date.now();
        set(fileIdsState, (fileIds) => [fileId, ...fileIds]);
        set(fileNameState(fileId), fileName === "" ? "New File" : fileName);
        set(fileContentState(fileId), "");
        set(sceneState, SCENE_NAMES.HOME);
      }
  );
  const onCreateExampleHtmlPress = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        console.log("CreateFile.onCreateExampleHtmlPress", fileName);
        const fileName = await snapshot.getPromise(editingFileNameState);
        const title = await snapshot.getPromise(selectingExampleHtmlTitleState);
        const code = await snapshot.getPromise(selectingExampleHtmlCodeState);
        const fileId = Date.now();
        set(fileIdsState, (fileIds) => [fileId, ...fileIds]);
        set(
          fileNameState(fileId),
          fileName === "" ? title + ".html" : fileName
        );
        set(fileContentState(fileId), code);
        set(sceneState, SCENE_NAMES.HOME);
      }
  );
  const onExampleHtmlNextPress = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        console.log("CreateFile.onExampleHtmlNextPress");
        const index = await snapshot.getPromise(selectingExampleHtmlIndexState);
        const num = await snapshot.getPromise(numExampleHtmlState);
        const newIndex = (index + 1) % num;
        set(selectingExampleHtmlIndexState, newIndex);
      }
  );
  const onExampleHtmlPrevPress = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        console.log("CreateFile.onExampleHtmlPrevPress");
        const index = await snapshot.getPromise(selectingExampleHtmlIndexState);
        const num = await snapshot.getPromise(numExampleHtmlState);
        const newIndex = (index - 1 + num) % num;
        set(selectingExampleHtmlIndexState, newIndex);
      }
  );
  return {
    onBackPress,
    onCreateEmptyFilePress,
    onCreateExampleHtmlPress,
    onExampleHtmlNextPress,
    onExampleHtmlPrevPress,
  };
};

const numExampleHtmlState = selector({
  key: "CraeteFile.numExampleHtmlState",
  get: ({ get }) => get(examplehtmlsStates.idsState).length,
});

const selectingExampleHtmlIndexState = atom({
  key: "CreateFile.selectingExampleHtmlIndex",
  default: 0,
});
const selectingExampleHtmlIdState = selector({
  key: "CreateFile.selectingExampleHtmlIdState",
  get: ({ get }) => {
    const ids = get(examplehtmlsStates.idsState);
    const index = get(selectingExampleHtmlIndexState);
    return ids[index % ids.length];
  },
});
const selectingExampleHtmlTitleState = selector({
  key: "CreateFile.selectingExampleHtmlTitleState",
  get: ({ get }) =>
    get(examplehtmlsStates.titleState(get(selectingExampleHtmlIdState))),
});
const selectingExampleHtmlCodeState = selector({
  key: "CreateFile.selectingExampleHtmlCodeState",
  get: ({ get }) =>
    get(examplehtmlsStates.codeState(get(selectingExampleHtmlIdState))),
});
const editingFileNameState = atom({
  key: "CreateFile.fileNameState",
  default: "",
});

const ExampleHTMLsView = () => {
  const actions = useCreateFileActions();
  const title = useRecoilValueLoadable(selectingExampleHtmlTitleState);
  const code = useRecoilValueLoadable(selectingExampleHtmlCodeState);
  return (
    <VStack
      flex={1}
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      space="xs"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Button variant="ghost" onPress={actions.onExampleHtmlPrevPress}>
          ←
        </Button>
        <Skeleton isLoaded={code.state === "hasValue"}>
          <TextArea flexGrow={1} value={code.contents} disabled={true} />
        </Skeleton>
        <Button variant="ghost" onPress={actions.onExampleHtmlNextPress}>
          →
        </Button>
      </HStack>
      <Text>{title.valueMaybe() || ""}</Text>
    </VStack>
  );
};

export const CreateFileView = () => {
  const actions = useCreateFileActions();
  const [fileName, setFileName] = useRecoilState(editingFileNameState);

  return (
    <VStack
      space="md"
      flex={1}
      alignItems="center"
      justifyContent="space-between"
      padding="3"
    >
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
      </VStack>
      <HStack
        flexGrow={1}
        width="full"
        space="xs"
        justifyContent="space-around"
      >
        <VStack>
          <View flexGrow={1} />
          <Button onPress={actions.onCreateEmptyFilePress}>
            空のファイルを作成
          </Button>
        </VStack>
        <VStack>
          <ExampleHTMLsView />
          <Button onPress={actions.onCreateExampleHtmlPress}>
            テンプレートから作成
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};
