import React from "react";
import FileView from "./FileView";
import { ComponentStory, ComponentMeta } from "@storybook/react";
export default {
  title: "FileView",
  component: FileView,
} as ComponentMeta<typeof FileView>;

export const Default: ComponentStory<typeof FileView> = (args) => (
  <FileView {...args} />
);
Default.args = {
  key: "key",
  name: "index.html",
  onOpenClick: () => {
    console.log("onOpenClick");
  },
  onDeleteClick: () => {
    console.log("onDeleteClick");
  },
};
