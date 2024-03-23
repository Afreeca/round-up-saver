import { Box, Dialog, DialogTitle, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ open, title, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Box display='flex' flexDirection='column'>
          <Typography variant='h5'>{title}</Typography>
        </Box>
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default Modal;
