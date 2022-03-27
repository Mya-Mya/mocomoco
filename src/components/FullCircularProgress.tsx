import { Backdrop, CircularProgress } from "@mui/material";
import { common } from "@mui/material/colors";
import React from "react";
export default (p: { open: boolean; onClick?: () => void }) => (
  <Backdrop
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={p.open}
    onClick={p.onClick ? p.onClick : () => {}}
  >
    <CircularProgress sx={{ color: common.white }} />
  </Backdrop>
);
