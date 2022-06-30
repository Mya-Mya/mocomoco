import React from "react";
import ChannelConfigWrapper from "./ChannelConfigWrapper";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
export default {
  title: "ChannelConfigWrapper",
  component: ChannelConfigWrapper,
} as ComponentMeta<typeof ChannelConfigWrapper>;

export const NotChoosing: ComponentStory<typeof ChannelConfigWrapper> = (
  args
) => <ChannelConfigWrapper {...args} />;

NotChoosing.args = {
  name: "NotChoosing Channel",
  isChoosing: false,
  content: <div>NotChoosing Channel</div>,
  onChooseClick: action("onChooseClick"),
};

export const Choosing: ComponentStory<typeof ChannelConfigWrapper> = (args) => (
  <ChannelConfigWrapper {...args} />
);

Choosing.args = {
  name: "Choosing Channel",
  isChoosing: true,
  content: <div>Choosing Channel</div>,
  onChooseClick: action("onChooseClick"),
};
