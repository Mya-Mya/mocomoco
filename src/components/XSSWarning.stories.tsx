import React from "react";
import XSSWarning from "./XSSWarning";
import { ComponentStory, ComponentMeta } from "@storybook/react";
export default {
  title: "WSSWarning",
  component: XSSWarning,
} as ComponentMeta<typeof XSSWarning>;

export const Default: ComponentStory<typeof XSSWarning> = (args) => (
  <XSSWarning {...args} />
);
