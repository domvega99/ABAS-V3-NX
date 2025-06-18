import { ModeContext } from '@/utils/context/ModeContext';
import { Box, Stack } from '@mui/material';
import { IconCheck } from '@tabler/icons-react';
import React, { useContext } from 'react';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useContext(ModeContext);

  const handleSwitchToTheme1 = () => {
    localStorage.setItem('theme', 'theme1'); 
    toggleTheme(); 
  };

  const handleSwitchToTheme2 = () => {
    localStorage.setItem('theme', 'theme2'); 
    toggleTheme(); 
  };

  return (
    <Stack flexDirection="row" gap={2} flexWrap="wrap">
        <Box onClick={handleSwitchToTheme1} 
            sx={{ 
                width: '50px', 
                height: '50px', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #3949AB 50%, #A1D2FA 50%)',
                borderRadius: '50%' 
            }}
        >
            {theme === 'theme1' ? <IconCheck color='white' stroke={1.5} size="2rem"/> : ''}
        </Box>
        <Box onClick={handleSwitchToTheme2}
            sx={{ 
                width: '50px', 
                height: '50px', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #EA3A72 50%, #FDE8EF 50%)',
                borderRadius: '50%' 
            }}
        >
            {theme === 'theme2' ? <IconCheck color='white' stroke={1.5} size="2rem"/> : ''}
        </Box>
    </Stack>
  );
};

export default ThemeToggleButton;
