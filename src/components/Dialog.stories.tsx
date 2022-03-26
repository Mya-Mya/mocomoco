import React from "react";
import Dialog from "./Dialog";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import XSSWarning from "./XSSWarning";
export default {
  title: "Dialog",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const WithXSSWarning: ComponentStory<typeof Dialog> = (args) => (
  <Dialog {...args} />
);
WithXSSWarning.args = {
  isOpen: true,
  setIsOpen: (_isOpen: boolean) => {
    alert("setIsOpen");
  },
  title: "重要なお知らせ",
  children: <XSSWarning />,
  selections: [
    {
      label: "Detail",
      closeOnPress: true,
      onPress: () => {
        alert("Detail Press");
      },
      variant: "outlined",
    },
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
export const Normal: ComponentStory<typeof Dialog> = (args) => (
  <Dialog {...args} />
);
Normal.args = {
  isOpen: true,
  setIsOpen: (isOpen: boolean) => {
    console.log("setIsOpen", isOpen);
  },
  title: "ファイルの削除",
  message: "削除しますか？:index.html",
  selections: [
    {
      label: "キャンセル",
      closeOnPress: true,
      onPress: () => {
        alert("キャンセル");
      },
      variant: "outlined",
    },
    {
      label: "削除する",
      closeOnPress: true,
      onPress: () => {
        alert("削除する");
      },
      variant: "contained",
    },
  ],
};
