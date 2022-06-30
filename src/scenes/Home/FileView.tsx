import React from "react";
import { ListItem, Button, ListItemButton, ListItemText } from "@mui/material";
export default (p: {
  key: string;
  name: string | undefined;
  onOpenClick: () => void;
  onDeleteClick: () => void;
}) => {
  return (
    <ListItem
      key={p.key}
      secondaryAction={
        <Button variant="text" onClick={p.onDeleteClick}>
          削除
        </Button>
      }
      disablePadding
    >
      <ListItemButton onClick={p.onOpenClick}>
        <ListItemText primary={p.name || ""} />
      </ListItemButton>
    </ListItem>
  );
};
