import React from "react";
import ChannelChoosingView from "./ChannelChoosingView";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Channel } from "./newFileSlice";
export default {
  title: "ChannelChoosingView",
  component: ChannelChoosingView,
} as ComponentMeta<typeof ChannelChoosingView>;

export const NotChoosing: ComponentStory<typeof ChannelChoosingView> = (
  args
) => <ChannelChoosingView {...args} />;

NotChoosing.args = {
  choosingChannel: undefined,
  emptyChannelConfigElement: <div>NotChoosing Channel</div>,
  onEmptyChannelClick: action("onEmptyChannelClick"),
  localFileConfigElement: <div>NotChoosing Channel</div>,
  onLocalFileClick: action("onLocalFileClick"),
  examplehtmlConfigElement: <div>NotChoosing Channel</div>,
  onExamplehtmlClick: action("onExamplehtmlClick"),
};

export const ChoosingLocalFileChannel: ComponentStory<
  typeof ChannelChoosingView
> = (args) => <ChannelChoosingView {...args} />;

ChoosingLocalFileChannel.args = {
  choosingChannel: Channel.LOCALFILE,
  emptyChannelConfigElement: <div>NotChoosing Channel</div>,
  onEmptyChannelClick: action("onEmptyChannelClick"),
  localFileConfigElement: <div>Local File Config</div>,
  onLocalFileClick: action("onLocalFileClick"),
  examplehtmlConfigElement: <div>NotChoosing Channel</div>,
  onExamplehtmlClick: action("onExamplehtmlClick"),
};
