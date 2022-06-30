import React from "react";
import HomeView from "./HomeView";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Document } from "../../globalstates/documents";
export default {
  title: "HomeView",
  component: HomeView,
} as ComponentMeta<typeof HomeView>;

export const Default: ComponentStory<typeof HomeView> = (args) => (
  <HomeView {...args} />
);

let documents: { [id: string]: Document } = {};
for (let i = 0; i < 10; i++) {
  documents[`id${i}`] = {
    content: "",
    title: `title${i}`,
  };
}
Default.args = {
  isLoading: false,
  documents,
  onCreateClick: action("onCreateClick"),
  onOpenClick: action("onOpenClick"),
  onDeleteClick: action("onDeleteClick"),
  onAboutClick: action("onAboutClick"),
};

export const Loading: ComponentStory<typeof HomeView> = (args) => (
  <HomeView {...args} />
);
Loading.args = {
  isLoading: true,
  documents,
  onCreateClick: action("onCreateClick"),
  onOpenClick: action("onOpenClick"),
  onDeleteClick: action("onDeleteClick"),
  onAboutClick: action("onAboutClick"),
};
