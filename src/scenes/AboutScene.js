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

export const useAboutActions = () => {
  const onReturnPress = useRecoilCallback(({ set }) => () => {
    console.log("About.onReturnPress");
    set(sceneState, SCENE_NAMES.HOME);
  });
  const onOpenRepositoryPress = useRecoilCallback(() => () => {
    console.log("About.onOpenRepositoryPress");
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
          <HStack space="xs">
            <Button onPress={actions.onReturnPress}>戻る</Button>
            <Button variant="outline" onPress={actions.onOpenRepositoryPress}>
              リポジトリ
            </Button>
          </HStack>
        </VStack>
      </Center>
    </View>
  );
};
