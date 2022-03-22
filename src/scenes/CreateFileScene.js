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
  ScrollView,
  Pressable,
  Select,
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
  DefaultValue,
} from "recoil";
import {
  fileContentState,
  fileIdsState,
  fileNameState,
} from "../states/filesStates";
import * as examplehtmlsStates from "../states/examplehtmlsStates";
import sceneState, { SCENE_NAMES } from "../states/sceneState";
export const useCreateFileActions = () => {
  const onEnter = useRecoilCallback(({ set }) => () => {
    console.log("CreateFile.onEnter");
    for (let state of [
      channelState,
      draftFileNameState,
      localFileContentState,
      selectingExampleHtmlIdState,
    ])
      set(state, new DefaultValue());
  });
  const onBackPress = useRecoilCallback(({ set }) => () => {
    console.log("CreateFile.onBackPress");
    set(sceneState, SCENE_NAMES.HOME);
  });
  const onChannelSelected = useRecoilCallback(({ set }) => (channel) => {
    console.log("CreateFile.onChannelSelected", channel);
    set(channelState, channel);
  });
  const onCreateFilePress = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        console.log("CreateFile.onCreateFilePress");
        const fileId = Date.now();
        const draftFileName = await snapshot.getPromise(draftFileNameState);
        const fileName = draftFileName === "" ? "NewFile.html" : draftFileName;
        const code = await snapshot.getPromise(draftCodeState);
        set(fileIdsState, (fileIds) => [fileId, ...fileIds]);
        set(fileNameState(fileId), fileName);
        set(fileContentState(fileId), code);
        set(sceneState, SCENE_NAMES.HOME);
      }
  );
  const onLocalFileSelected = useRecoilCallback(
    ({ set, snapshot }) =>
      async (event) => {
        console.log("CreateFile.onLocalFileSelected");
        const file = event.target.files[0];
        const name = file.name;
        if (await snapshot.getPromise(isDraftFileNameEmptyState))
          set(draftFileNameState, name);
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          set(localFileContentState, content);
        };
        reader.readAsText(file);
      }
  );
  return {
    onEnter,
    onBackPress,
    onCreateFilePress,
    onChannelSelected,
    onLocalFileSelected,
  };
};

const selectingExampleHtmlIdState = atom({
  key: "CreateFile.selectingExampleHtmlIdState",
  default: null,
});

const selectingExampleHtmlCodeState = selector({
  key: "CreateFile.selectingExampleHtmlCodeState",
  get: ({ get }) =>
    get(examplehtmlsStates.codeState(get(selectingExampleHtmlIdState))),
});

const localFileContentState = atom({
  key: "CreateFile.localFileContentState",
  default: null,
});

const CHANNELS = {
  UNSELECTED: "UNSELECTED",
  EMPTY: "EMPTY",
  LOCAL: "LOCAL",
  EXAMPLE_HTMLS: "EXAMPLE_HTMLS",
};
const channelState = atom({
  key: "CreateFile.channelState",
  default: CHANNELS.UNSELECTED,
});
const anyChannelSelectedState = selector({
  key: "CreateFile.anyChannelSelectedState",
  get: ({ get }) => get(channelState) !== CHANNELS.UNSELECTED,
});
const draftCodeState = selector({
  key: "CreateFile.draftCodeState",
  get: ({ get }) => {
    const channel = get(channelState);
    switch (channel) {
      case CHANNELS.UNSELECTED:
      case CHANNELS.EMPTY:
        return "";
      case CHANNELS.LOCAL:
        return get(localFileContentState);
      case CHANNELS.EXAMPLE_HTMLS:
        return get(selectingExampleHtmlCodeState);
    }
  },
});
const draftFileNameState = atom({
  key: "CreateFile.draftFileNameState",
  default: "",
});
const isDraftFileNameEmptyState = selector({
  key: "CreateFile.isDraftFileNameEmptyState",
  get: ({ get }) => get(draftFileNameState) === "",
});
const isSaveableState = selector({
  key: "CreateFile.isSaveableState",
  get: ({ get }) =>
    !get(isDraftFileNameEmptyState) && get(anyChannelSelectedState),
});

const DraftCodeView = () => {
  const anyChannelSelected = useRecoilValue(anyChannelSelectedState);
  const code = useRecoilValueLoadable(draftCodeState);
  const editorRef = useRef(null);
  let editor = null;
  useEffect(() => {
    if (editorRef.current) {
      editor = useHTMLEditor({
        initialCode: code.valueMaybe() || "",
        onChange: (code) => {},
        ref: editorRef,
        readOnly: true,
        fontSize: 12,
      });
      return () => editor.destroy();
    }
  }, [code]);
  return (
    <ScrollView maxH="500px">
      <Skeleton.Text
        lineHeight="lg"
        lines={6}
        isLoaded={code.state === "hasValue" && anyChannelSelected}
      >
        <View ref={editorRef} />
      </Skeleton.Text>
    </ScrollView>
  );
};
const DraftView = () => {
  const [draftFileName, setDraftFileName] = useRecoilState(draftFileNameState);
  return (
    <VStack flexGrow={1} space="xs" width="full" alignItems="stretch">
      <Input
        placeholder="ファイル名は?"
        value={draftFileName}
        onChangeText={setDraftFileName}
      />
      <DraftCodeView />
    </VStack>
  );
};

const ExampleHtmlsSelectView = () => {
  const [selectingExampleHtmlId, setSelectingExampleHtmlId] = useRecoilState(
    selectingExampleHtmlIdState
  );
  const idAndTitlePairs =
    useRecoilValueLoadable(
      examplehtmlsStates.idAndTitlePairsState
    ).valueMaybe() || [];

  return (
    <Select
      selectedValue={selectingExampleHtmlId}
      accessibilityLabel="HTML例を選択"
      placeholder="HTML例を選択"
      onValueChange={setSelectingExampleHtmlId}
    >
      {idAndTitlePairs.map(({ id, title }) => (
        <Select.Item label={title} value={id} key={id} />
      ))}
    </Select>
  );
};

const ChannelSelectionView = ({ channel, channelLabel, children }) => {
  const actions = useCreateFileActions();
  const isSelected = useRecoilValue(channelState) === channel;
  const getBgColor = (isHovered, isPressed) => {
    if (isSelected) return "blueGray.200";
    if (isPressed) return "blueGray.300";
    if (isHovered) return "blueGray.200";
    return "blueGray.100";
  };
  return (
    <Pressable
      onPress={() => actions.onChannelSelected(channel)}
      flexGrow={isSelected ? 1 : 0}
    >
      {({ isHovered, isPressed }) => (
        <Box
          flexGrow={1}
          p="3"
          rounded="lg"
          bgColor={getBgColor(isHovered, isPressed)}
          borderWidth={isSelected ? 2 : 0}
          borderColor="primary.500"
        >
          <Heading>{channelLabel}</Heading>
          {isSelected && children}
        </Box>
      )}
    </Pressable>
  );
};

export const CreateFileView = () => {
  const actions = useCreateFileActions();
  const isSaveable = useRecoilValue(isSaveableState);
  useEffect(actions.onEnter, []);
  return (
    <VStack
      space="xl"
      flex={1}
      alignItems="stretch"
      justifyContent="space-between"
      padding="3"
    >
      <HStack alignItems="center" space="xs" justifyContent="center">
        <Button variant="outline" onPress={actions.onBackPress}>
          ←
        </Button>
        <Heading size="lg">新しいファイルを作ります</Heading>
      </HStack>
      <HStack
        flexGrow={1}
        width="full"
        space="xs"
        justifyContent="space-around"
      >
        <VStack w="40%" space="md">
          <ChannelSelectionView
            channel={CHANNELS.EMPTY}
            channelLabel="空白のページ"
          >
            <Text>真っ白なページを作ります</Text>
          </ChannelSelectionView>
          <ChannelSelectionView
            channel={CHANNELS.LOCAL}
            channelLabel="ローカルのファイル"
          >
            <input type="file" onChange={actions.onLocalFileSelected} />
          </ChannelSelectionView>
          <ChannelSelectionView
            channel={CHANNELS.EXAMPLE_HTMLS}
            channelLabel="サンプルのHTML"
          >
            <ExampleHtmlsSelectView />
          </ChannelSelectionView>
        </VStack>
        <View w="40%">
          <DraftView />
        </View>
      </HStack>
      <HStack justifyContent="flex-end">
        <Button
          onPress={actions.onCreateFilePress}
          size="lg"
          isDisabled={!isSaveable}
        >
          作成
        </Button>
      </HStack>
    </VStack>
  );
};
