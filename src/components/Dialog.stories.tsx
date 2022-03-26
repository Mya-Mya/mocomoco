import React from "react";
import Dialog from "./Dialog";
import { ComponentStory, ComponentMeta } from "@storybook/react";
export default {
  title: "Dialog",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const Default: ComponentStory<typeof Dialog> = (args) => (
  <Dialog {...args} />
);
Default.args = {
  isOpen: true,
  setIsOpen: (_isOpen: boolean) => {
    alert("setIsOpen");
  },
  title: "title",
  message: "message",
  selections: [
    {
      label: "Close",
      closeOnPress: true,
      onPress: () => {
        alert("Close Press");
      },
      variant: "contained",
    },
  ],
};
