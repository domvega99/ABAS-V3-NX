import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

const SingleSnackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%', color: '#FFFFFF' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SingleSnackbar;
