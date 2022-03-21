import React from "react";
import { View, Center, VStack, Text, Heading, Link } from "native-base";
export default () => (
  <View flex={1}>
    <Center flex={1}>
      <VStack space="1" textAlign="center">
        <Heading color="danger.500">⚠</Heading>
        <Heading size="lg" color="danger.500">
          そのHTML、安全ですか？
        </Heading>
        <Text>HTMLには</Text>
        <Text>
          <Text bold>
            PCをウイルスに感染させる
            <Link href="https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%AD%E3%82%B9%E3%82%B5%E3%82%A4%E3%83%88%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0">
              賢い書き方
            </Link>
            があります。
          </Text>
        </Text>
        <Text>
          ウイルスに感染すると、あなたの情報が知らないうちに漏れたり、あなたを混乱させたり、PCが自由に使えなくなったりすることがあります。
        </Text>
        <Text>
          このアプリにはHTMLコードを実行する機能があり、
          <Link href="https://ja.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml">
            ウイルスに感染する恐れが指摘されています
          </Link>
          。
        </Text>
        <Text>
          <Text bold>信頼できないHTMLコードはここには持ってこない</Text>
          ようにしましょう。
        </Text>
      </VStack>
    </Center>
  </View>
);
