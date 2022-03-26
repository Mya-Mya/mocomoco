import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

export type SelectionProp = {
  label: string;
  onPress?: () => void;
  variant?: "outlined" | "contained" | "text";
  closeOnPress?: boolean;
};

const SelectionButton = (p: {
  selectionProp: SelectionProp;
  close: () => void;
}) => {
  const variant = p.selectionProp.variant || "text";
  const closeOnPress = p.selectionProp.closeOnPress || true;
  const handlePress = p.selectionProp.onPress || (() => {});
  const onPress = () => {
    handlePress();
    if (closeOnPress) p.close();
  };
  return (
    <Button variant={variant} onClick={onPress}>
      {p.selectionProp.label}
    </Button>
  );
};

export default (p: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  message: string;
  children?: JSX.Element;
  selections: SelectionProp[];
}) => {
  const close = () => p.setIsOpen(false);
  const dom = (
    <Dialog open={p.isOpen} onClose={close}>
      <DialogTitle>{p.title}</DialogTitle>
      <DialogContent>
        {p.message && <DialogContentText>{p.message}</DialogContentText>}
        {p.children}
      </DialogContent>
      <DialogActions>
        {p.selections.map((selection) => (
          <SelectionButton selectionProp={selection} close={close} />
        ))}
      </DialogActions>
    </Dialog>
  );
  return dom;
};
