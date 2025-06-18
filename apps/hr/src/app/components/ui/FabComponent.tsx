import { Fab } from '@mui/material';
import React, { ReactNode } from 'react';

interface FabComponentProps {
  children: ReactNode; 
}

const FabComponent: React.FC<FabComponentProps> = ({ children }) => {
  return (
    <Fab
      size="small"
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        '&:hover': {
          backgroundColor: 'primary.main',
          color: 'primary.light'
        },
      }}  
    >
      {children} 
    </Fab>
  );
};

export default FabComponent;
