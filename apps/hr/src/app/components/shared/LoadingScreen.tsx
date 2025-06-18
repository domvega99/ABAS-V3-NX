import { Box, CircularProgress, useTheme } from '@mui/material'

const LoadingScreen = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                top: 0,
                left: 0,
                zIndex: 50,
                backgroundColor: '#2A3F54',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <CircularProgress sx={{ color: 'primary.light' }} size={50}/>
        </Box>
    )
}

export default LoadingScreen
