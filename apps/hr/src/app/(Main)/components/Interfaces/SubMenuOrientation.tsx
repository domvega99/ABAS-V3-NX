import { initializeSubMenuStyle, setSubMenuStyle } from '@/app/state/slice/styles/subMenuStyleSlice';
import { RootState } from '@/app/state/store';
import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SubMenuOrientation = () => {

    const dispatch = useDispatch();
    const subMenuStyle = useSelector((state: RootState) => state.subMenuStyle.SubMenuStyle);
  
    useEffect(() => {
      dispatch(initializeSubMenuStyle());
    }, [dispatch]);
  
    const handleMenuStyleChange = (style: string) => {
      dispatch(setSubMenuStyle(style));
    };

    return (
        <Stack flexDirection='row' gap={2}>
            {/* Sidebar Menu */}
            <Box 
                onClick={() => handleMenuStyleChange('Sidebar')}
                sx={{
                    padding: 0.5,
                    width: 60,
                    height: 60,
                    border: `2px ${subMenuStyle === 'Sidebar' ? 'solid #000000' : 'dashed #90caf9'}`,
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
            {/* Topbar Menu */}
            <Box 
                onClick={() => handleMenuStyleChange('Topbar')}
                sx={{
                    padding: 0.5,
                    width: 60,
                    height: 60,
                    border: `2px ${subMenuStyle === 'Topbar' ? 'solid #000000' : 'dashed #90caf9'}`,
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            > 
                <Box
                    sx={{
                        width: 50,
                        height: 20,
                        backgroundColor: '#90caf9',
                        opacity: 0.5,
                    }}
                />
            </Box>
        </Stack>
    )
}

export default SubMenuOrientation
