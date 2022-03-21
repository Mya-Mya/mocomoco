import React, { useState } from "react";
import {
  View,
  Center,
  Button,
  Text,
  Heading,
  VStack,
  HStack,
  Input,
  Box,
  Pressable,
  FlatList,
  ScrollView,
} from "native-base";
import {
  fileIdsState,
  fileContentState,
  fileNameState,
} from "../states/filesStates";
import {
  useSetRecoilState,
  useRecoilCallback,
  useRecoilValue,
  useRecoilValueLoadable,
  atom,
  useRecoilState,
} from "recoil";
import sceneState, { SCENE_NAMES } from "../states/sceneState";
import editingFileIdState from "../states/editingFileIdState";
import Dialog from "../components/Dialog";
import XSSWarning from "../components/XSSWarning";

export const useHomeActions = () => {
  /**
   * @param {string} fileId
   */
  const onOpenFilePress = useRecoilCallback(({ set }) => (fileId) => {
    console.log("Home.onOpenFilePress", fileId);
    set(editingFileIdState, fileId);
    set(sceneState, SCENE_NAMES.FILE_EDITOR);
  });
  /**
   * @param {string} fileId
   */
  const onDeleteFileConfirm = useRecoilCallback(
    ({ set, reset }) =>
      (fileId) => {
        console.log("Home.onDeleteFileConfirm", fileId);
        set(fileIdsState, (fileIds) => fileIds.filter((x) => x !== fileId));
        reset(fileContentState(fileId));
        reset(fileNameState(fileId));
      }
  );
  const onCreateClick = useRecoilCallback(({ set }) => async () => {
    console.log("Home.onCreateClick");
    set(sceneState, SCENE_NAMES.CREATE_FILE);
  });
  const onAboutClick = useRecoilCallback(({ set }) => () => {
    console.log("Home.onAboutClick");
    set(sceneState, SCENE_NAMES.ABOUT);
  });

  return { onOpenFilePress, onCreateClick, onDeleteFileConfirm, onAboutClick };
};

const isXSSWarningDialogOpenState = atom({
  key: "Home.isXSSWarningVisible",
  default: true,
});

const FileView = ({ fileId, onOpenFilePress, onDeleteFilePress }) => {
  const fileName = useRecoilValueLoadable(fileNameState(fileId));
  return (
    <Pressable onPress={() => onOpenFilePress(fileId)}>
      {(mouse) => (
        <Box
          bgColor={mouse.isHovered ? "blueGray.200" : "blueGray.100"}
          flex={1}
          justifyContent="center"
          padding="3"
          rounded="md"
        >
          <HStack justifyContent="space-between">
            <Text>{fileName.valueMaybe()}</Text>
            <Button variant="link" onPress={() => onDeleteFilePress(fileId)}>
              削除
            </Button>
          </HStack>
        </Box>
      )}
    </Pressable>
  );
};

const FilesView = ({ onOpenFilePress, onDeleteFilePress }) => {
  const fileIds = useRecoilValueLoadable(fileIdsState).valueMaybe() || [];

  return (
    <View flexGrow={1}>
      <ScrollView flexGrow={1} h="32">
        <VStack padding="3" space="xs">
          {fileIds.map((fileId) => (
            <FileView
              key={fileId}
              fileId={fileId}
              onOpenFilePress={onOpenFilePress}
              onDeleteFilePress={onDeleteFilePress}
            />
          ))}
        </VStack>
      </ScrollView>
    </View>
  );
};

export const HomeView = () => {
  const actions = useHomeActions();
  const [deletingFileId, setDeletingFileId] = useState(undefined);
  const deletingFileName = useRecoilValueLoadable(
    fileNameState(deletingFileId)
  );
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);
  const [isXSSWarningDialogOpen, setIsXSSWarningDialogOpen] = useRecoilState(
    isXSSWarningDialogOpenState
  );
  return (
    <View flex={1}>
      <HStack flex={1} space="xs">
        <Center flex={1}>
          <VStack space="xs">
            <Heading size="lg">Mocomoco</Heading>
            <Text>モクモクとコードを書く場所</Text>
            <Button onPress={actions.onCreateClick}>新しいファイル</Button>
            <Button variant="outline" onPress={actions.onAboutClick}>
              このアプリについて
            </Button>
          </VStack>
        </Center>
        <View flex={1}>
          <FilesView
            onOpenFilePress={actions.onOpenFilePress}
            onDeleteFilePress={(fileId) => {
              setDeletingFileId(fileId);
              setIsConfirmDeleteDialogOpen(true);
            }}
          />
        </View>
      </HStack>
      <Dialog
        isOpen={isConfirmDeleteDialogOpen}
        setIsOpen={setIsConfirmDeleteDialogOpen}
        title="ファイルの削除"
        message={deletingFileName.valueMaybe() || ""}
        selections={[
          {
            label: "キャンセル",
            onPress: () => {},
            closeOnPress: true,
            variant: "outline",
          },
          {
            label: "はい",
            onPress: () => actions.onDeleteFileConfirm(deletingFileId),
            closeOnPress: true,
          },
        ]}
      />
      <Dialog
        isOpen={isXSSWarningDialogOpen}
        setIsOpen={setIsXSSWarningDialogOpen}
        title="はじめに"
        message=""
        children={<XSSWarning />}
        selections={[
          {
            label: "閉じる",
            closeOnPress: true,
          },
        ]}
      />
    </View>
  );
};
