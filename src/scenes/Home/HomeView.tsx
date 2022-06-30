import React, { useCallback } from "react";
import {
  Typography,
  Button,
  List,
  Container,
  Stack,
  Box,
  Grid,
  Paper,
  Backdrop,
} from "@mui/material";
import FileView from "./FileView";
import { Document } from "../../globalstates/documents";
import FullCircularProgress from "../../components/FullCircularProgress";

export default (p: {
  isLoading: boolean;
  documents: { [id: string]: Document };
  onCreateClick: () => void;
  onOpenClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  onAboutClick: () => void;
}) => (
  <Container>
    <FullCircularProgress open={p.isLoading} />
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h5">Mocomoco</Typography>
          <Typography variant="caption">モクモクとコードを書く場所</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="primary" onClick={p.onAboutClick}>
            このアプリについて
          </Button>
          <Button variant="contained" color="primary" onClick={p.onCreateClick}>
            ファイルを作成
          </Button>
        </Stack>
      </Stack>
      <Paper>
        <List
          sx={{
            position: "fixed",
            width: "100%",
            left: 0,
            height: "100%",
            overflowY: "auto",
          }}
        >
          {Object.entries(p.documents).map(([id, document]) => {
            const name = document.title || "";
            const onOpenClick = useCallback(() => p.onOpenClick(id), [id]);
            const onDeleteClick = useCallback(() => p.onDeleteClick(id), [id]);
            return (
              <FileView
                key={id}
                name={name}
                onOpenClick={onOpenClick}
                onDeleteClick={onDeleteClick}
              />
            );
          })}
        </List>
      </Paper>
    </Stack>
  </Container>
);
