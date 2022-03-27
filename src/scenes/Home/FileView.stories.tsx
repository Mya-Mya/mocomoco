import React from "react";
import FileView from "./FileView";
import { ComponentStory, ComponentMeta } from "@storybook/react";
export default {
  title: "FileView",
  component: FileView,
} as ComponentMeta<typeof FileView>;

export const Normal: ComponentStory<typeof FileView> = (args) => (
  <FileView {...args} />
);
Normal.args = {
  isLoading: false,
  key: "key",
  name: "index.html",
  onOpenClick: () => {
    console.log("onOpenClick");
  },
  onDeleteClick: () => {
    console.log("onDeleteClick");
  },
};

export const Loading: ComponentStory<typeof FileView> = (args) => (
  <FileView {...args} />
);
Loading.args = {
  isLoading: true,
  key: "key",
  name: undefined,
  onOpenClick: () => {
    console.log("onOpenClick");
  },
  onDeleteClick: () => {
    console.log("onDeleteClick");
  },
};
