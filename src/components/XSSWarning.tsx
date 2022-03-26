import React from "react";
import { Container, Stack, Typography, Link } from "@mui/material";
import { red } from "@mui/material/colors";
export default () => (
  <Container>
    <Stack sx={{ textAlign: "center" }}>
      <Stack color={red[500]}>
        <Typography variant="h3">⚠</Typography>
        <Typography variant="h4">そのHTML、安全ですか？</Typography>
      </Stack>
      <Stack>
        <Typography>HTMLには</Typography>
        <Typography>
          PCをウイルスに感染させる
          <Link href="https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%AD%E3%82%B9%E3%82%B5%E3%82%A4%E3%83%88%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0">
            賢い書き方
          </Link>
          があります。
        </Typography>
        <Typography>
          ウイルスに感染すると、あなたの情報が知らないうちに漏れたり、あなたを混乱させたり、PCが自由に使えなくなったりすることがあります。
        </Typography>
        <Typography>
          このアプリにはHTMLコードを実行する機能があり、
          <Link href="https://ja.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml">
            ウイルスに感染する恐れが指摘されています
          </Link>
          。
        </Typography>
        <Typography>
          <Typography>信頼できないHTMLコードはここには持ってこない</Typography>
          ようにしましょう。
        </Typography>
      </Stack>
    </Stack>
  </Container>
);
