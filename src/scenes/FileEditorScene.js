import React, { useRef, useEffect } from "react";
import { Dimensions } from "react-native";
import {
  View,
  Button,
  Text,
  HStack,
  Heading,
  Skeleton,
  Stack,
  ScrollView,
  Container,
  Input,
} from "native-base";
import { EditorView, keymap } from "@codemirror/view";
import {
  atom,
  useRecoilCallback,
  useRecoilRefresher_UNSTABLE,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import editingFileIdState from "../states/editingFileIdState";
import {
  fileContentState,
  fileNameState,
  filesAPI,
} from "../states/filesStates";
import sceneState, { SCENE_NAMES } from "../states/sceneState";
import useHTMLEditor from "./useHTMLEditor";
import createAndDownload from "../tools/createAndDownload";

const useFileEditorActions = () => {
  const editingFileId = useRecoilValue(editingFileIdState);
  const refreshEditingFileContent = useRecoilRefresher_UNSTABLE(
    fileContentState(editingFileId)
  );
  const onBackPress = useRecoilCallback(
    () => async (editingCode, editingFileName, needToSave) => {
      console.log("FileEditor.onBackPress", editingCode);
      needToSave && (await onSavePress(editingCode, editingFileName));
      onBackWithoutSavePress();
    }
  );
  const onBackWithoutSavePress = useRecoilCallback(({ set }) => () => {
    console.log("FileEditor.onBackWithoutSavePress");
    set(sceneState, SCENE_NAMES.HOME);
  });

  const onSavePress = useRecoilCallback(({ set }) =>
    /**
     * @param {string} editingCode
     * @param {string} editingFileName
     */
    async (editingCode, editingFileName) => {
      console.log("FileEditor.onSavePress", editingCode);
      set(fileContentState(editingFileId), editingCode);
      set(fileNameState(editingFileId), editingFileName);
      refreshEditingFileContent();
    }
  );
  return { onBackPress, onBackWithoutSavePress, onSavePress };
};

export const FileEditorView = () => {
  const actions = useFileEditorActions();
  const [editingCode, setEditingCode] = React.useState("");
  const [editingFileName, setEditingFileName] = React.useState("");
  const editingFileId = useRecoilValue(editingFileIdState);
  const fileName = useRecoilValueLoadable(fileNameState(editingFileId));
  const refreshFileContent = useRecoilRefresher_UNSTABLE(
    fileContentState(editingFileId)
  );
  React.useEffect(refreshFileContent, [refreshFileContent]);
  const fileContent = useRecoilValueLoadable(fileContentState(editingFileId));
  const codeEditorRef = useRef(null);
  let codeEditor = null;

  //Create codeEditor
  useEffect(() => {
    if (codeEditorRef.current) {
      codeEditor = useHTMLEditor({
        ref: codeEditorRef,
        initialCode: fileContent.valueMaybe() || "",
        onChange: setEditingCode,
        readOnly: false,
      });
      return () => codeEditor.destroy();
    }
  }, [fileContent.state]);

  //Initialize editingCode
  useEffect(
    () => setEditingCode(fileContent.valueMaybe()),
    [fileContent.state]
  );
  //Initialize editingFileName
  useEffect(() => {
    setEditingFileName(fileName.valueMaybe());
  }, [fileName.state]);

  const needToSave =
    editingCode !== fileContent.valueMaybe() ||
    editingFileName !== fileName.valueMaybe();

  const windowHeight = Dimensions.get("window").height;

  return (
    <View flex={1}>
      <HStack
        h="60px"
        justifyContent="space-between"
        padding="1"
        alignItems="center"
      >
        <HStack space="xs">
          <Button
            variant="outline"
            onPress={() =>
              actions.onBackPress(editingCode, editingFileName, needToSave)
            }
          >
            ←
          </Button>
          {needToSave && (
            <Button variant="outline" onPress={actions.onBackWithoutSavePress}>
              保存せずに戻る
            </Button>
          )}
        </HStack>
        <Skeleton.Text lines={2} isLoaded={fileName.state === "hasValue"}>
          <Input value={editingFileName} onChangeText={setEditingFileName} />
        </Skeleton.Text>
        <HStack space="xs">
          {needToSave && (
            <Button
              onPress={() => actions.onSavePress(editingCode, editingFileName)}
            >
              保存
            </Button>
          )}
          <Button
            variant="outline"
            onPress={() => createAndDownload(editingCode, editingFileName)}
          >
            自分の端末にダウンロード
          </Button>
        </HStack>
      </HStack>

      <HStack maxH={`${windowHeight - 60}px`} flex={1} flexGrow={1}>
        <ScrollView w="50%" flexGrow={1}>
          <View ref={codeEditorRef} />
        </ScrollView>
        <ScrollView w="50%" flexGrow={1}>
          <div dangerouslySetInnerHTML={{ __html: editingCode }} />
        </ScrollView>
      </HStack>
    </View>
  );
};
