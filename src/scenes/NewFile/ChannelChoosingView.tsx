import React from "react";
import { Stack } from "@mui/material";
import ChannelConfigWrapper from "./ChannelConfigWrapper";
import { Channel } from "./newFileSlice";

export default (p: {
  choosingChannel: Channel | undefined;
  emptyChannelConfigElement: JSX.Element;
  onEmptyChannelClick: () => void;
  localFileConfigElement: JSX.Element;
  onLocalFileClick: () => void;
  examplehtmlConfigElement: JSX.Element;
  onExamplehtmlClick: () => void;
}) => (
  <Stack spacing={1}>
    <ChannelConfigWrapper
      name="空白のページ"
      isChoosing={p.choosingChannel === Channel.EMPTY}
      onChooseClick={p.onEmptyChannelClick}
      content={p.emptyChannelConfigElement}
    />
    <ChannelConfigWrapper
      name="自分のPCからファイルを選択"
      isChoosing={p.choosingChannel === Channel.LOCALFILE}
      onChooseClick={p.onLocalFileClick}
      content={p.localFileConfigElement}
    />
    <ChannelConfigWrapper
      name="HTML例を見る"
      isChoosing={p.choosingChannel === Channel.EXAMPLEHTML}
      onChooseClick={p.onExamplehtmlClick}
      content={p.examplehtmlConfigElement}
    />
  </Stack>
);
