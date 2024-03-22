import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import React, { FC, ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({
  open,
  title,
  onClose,
  onConfirm,
  children
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Box display="flex" flexDirection="column">
          <Typography variant="h5">{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {children}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
