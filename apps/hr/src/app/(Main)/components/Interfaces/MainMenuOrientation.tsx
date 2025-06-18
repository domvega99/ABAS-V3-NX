import { initializeMenuStyle, setMenuStyle } from '@/app/state/slice/styles/menuStyleSlice';
import { RootState } from '@/app/state/store';
import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MainMenuOrientation = () => {

    const dispatch = useDispatch();
    const menuStyle = useSelector((state: RootState) => state.menuStyle.menuStyle);
  
    useEffect(() => {
      dispatch(initializeMenuStyle());
    }, [dispatch]);
  
    const handleMenuStyleChange = (style: string) => {
      dispatch(setMenuStyle(style));
    };

    return (
        <Stack flexDirection='row' gap={2}>
            {/* Right Side Main Menu */}
            <Box 
                onClick={() => handleMenuStyleChange('RightSideMainMenu')}
                sx={{
                    padding: 0.5,
                    width: 60,
                    height: 60,
                    border: `2px ${menuStyle === 'RightSideMainMenu' ? 'solid #000000' : 'dashed #90caf9'}`,
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            > 
                <Box
                    sx={{
                        width: 20,
                        height: 50,
                        backgroundColor: '#90caf9',
                        opacity: 0.5,
                    }}
                />
            </Box>
            {/* Middle Main Menu */}
            <Box 
                onClick={() => handleMenuStyleChange('MiddleMainMenu')}
                sx={{
                    padding: 0.5,
                    width: 60,
                    height: 60,
                    border: `2px ${menuStyle === 'MiddleMainMenu' ? 'solid #000000' : 'dashed #90caf9'}`,
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            > 
                <Box
                    sx={{
                        width: 30,
                        height: 50,
                        backgroundColor: '#90caf9',
                        opacity: 0.5,
                    }}
                />
            </Box>
        </Stack>
    )
}

export default MainMenuOrientation
