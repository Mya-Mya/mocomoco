import { ButtonBase, Container, Stack, Typography } from "@mui/material";
import React from "react";
export default (p: {
  name: string;
  isChoosing: boolean;
  onChooseClick: () => void;
  content: JSX.Element;
}) => (
  <ButtonBase
    sx={{
      flexGrow: p.isChoosing ? 1 : 0,
    }}
    disabled={p.isChoosing}
    onClick={p.onChooseClick}
  >
    <Container
      sx={{
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: 1,
        borderColor: (theme) =>
          p.isChoosing ? theme.palette.primary.main : theme.palette.grey[100],
        backgroundColor: (theme) =>
          p.isChoosing ? theme.palette.grey[50] : theme.palette.grey[100],
        padding: 2,
      }}
    >
      <Stack alignItems="start" spacing={1}>
        <Typography variant="h5">{p.name}</Typography>
        {p.isChoosing && p.content}
      </Stack>
    </Container>
  </ButtonBase>
);
