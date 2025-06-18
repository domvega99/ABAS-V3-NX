import { ModeContext } from '@/utils/context/ModeContext';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import { IconMoon, IconSun } from '@tabler/icons-react';
import React, { useContext } from 'react';


const ModeToggleButton: React.FC = () => {
  const { mode, toggleMode } = useContext(ModeContext);

  return (
    <Stack onClick={toggleMode} color="inherit">
      <Tooltip title={mode === 'light' ? 'Dark Mode' : 'Light Mode'} placement="bottom">
        {mode === 'light' ? 
        <Box sx={{ 
          '&:hover': {
            color: 'primary.light'
          } 
        }}>
          <IconMoon stroke={1.5} size="1.3rem"/>
        </Box>
        : 
        <Box sx={{ 
          '&:hover': {
            color: 'primary.light',
          } 
        }}>
          <IconSun stroke={1.5} size="1.3rem"/>
        </Box>
        }
      </Tooltip>
    </Stack>
  );
};

export default ModeToggleButton;
