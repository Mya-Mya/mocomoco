import React from "react";
import {
  View,
  Text,
  Heading,
  Button,
  Center,
  VStack,
  HStack,
} from "native-base";
import { useRecoilCallback } from "recoil";
import sceneState, { SCENE_NAMES } from "../states/sceneState";
import * as WebBrowser from "expo-web-browser";

export const useAboutActions = () => {
  const onReturnPress = useRecoilCallback(({ set }) => () => {
    console.log("About.onReturnPress");
    set(sceneState, SCENE_NAMES.HOME);
  });
  const onOpenRepositoryPress = useRecoilCallback(() => async () => {
    console.log("About.onOpenRepositoryPress");
    await WebBrowser.openBrowserAsync("https://github.com/Mya-Mya/mocomoco");
  });
  return { onReturnPress, onOpenRepositoryPress };
};

export const AboutView = () => {
  const actions = useAboutActions();
  return (
    <View flex={1} alignItems="center">
      <Center flex={1} width="sm">
        <VStack space="xs">
          <Heading>Mocomoco</Heading>
          <Text>HTMLなどのソースコードを書いて試せるアプリです。</Text>
          <Text textAlign="right">Developed by やいも 2022-03</Text>
          <Button variant="outline" onPress={actions.onOpenRepositoryPress}>
            GitHub
          </Button>
          <Button onPress={actions.onReturnPress}>戻る</Button>
        </VStack>
      </Center>
    </View>
  );
};
