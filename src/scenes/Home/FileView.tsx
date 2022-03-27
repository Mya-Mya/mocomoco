import React from "react";
import {
  ListItem,
  Button,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";
export default (p: {
  isLoading: boolean;
  key: string;
  name: string | undefined;
  onOpenClick: () => void;
  onDeleteClick: () => void;
}) => {
  if (p.isLoading) return <Skeleton variant="rectangular" />;
  return (
    <ListItem
      key={p.key}
      secondaryAction={
        <Button variant="text" onClick={p.onDeleteClick}>
          削除
        </Button>
      }
    >
      <ListItemButton onClick={p.onOpenClick}>
        <ListItemText primary={p.name || ""} />
      </ListItemButton>
    </ListItem>
  );
};
