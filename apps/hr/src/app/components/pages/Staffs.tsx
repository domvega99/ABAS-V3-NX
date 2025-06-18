import Profile from '@/app/components/header/Profile';
import { Box, Divider, Fab, FormControl, InputAdornment, OutlinedInput, Pagination, Stack, Tooltip, Typography } from '@mui/material';
import { IconAdjustments, IconEyeCheck, IconSearch, IconUserCircle } from '@tabler/icons-react';

const data = [
    {
        name: 'Dominic A. Vega',
        position: 'Junior System Developer',
        status: 'Active',
        online: 'Yes'
    },
    {
        name: 'Marvin E. Toh',
        position: 'Junior System Developer',
        status: 'Active',
        online: 'Yes'
    },
    {
        name: 'Kent Colonia',
        position: 'Network Administrator',
        status: 'Active',
        online: 'No'
    }
]

const Staffs = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                <FormControl variant="outlined">
                    <OutlinedInput
                        size='small'
                        fullWidth
                        startAdornment={
                            <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                                <IconSearch stroke={1.5} size="1.3rem"/>
                            </InputAdornment>}
                    />
                </FormControl>
                <Fab color="primary" size='small'>
                    <IconAdjustments/>
                </Fab>
            </Box>
            <Stack>
                {data.map((row, index) => (
                    <Box key={index}>
                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' flexWrap='wrap'>
                            <Stack flexDirection='row' flexWrap='wrap' alignItems='center'>
                                <Stack sx={{ position: 'relative' }}>
                                    <Profile />
                                    <Box sx={{ top: 10, left: 10, position: 'absolute', width: 11, height: 11, backgroundColor: row.online === 'Yes' ? '#14BB38' : 'gray', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: 5, height: 5, backgroundColor: '#FFFFFF', borderRadius: '50%' }}></Box>
                                    </Box>
                                </Stack>
                                <Stack>
                                    <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>{row.name}</Typography>
                                    <Typography variant='body2' fontWeight={200} sx={{ color: '#9DA4BA', display: 'flex', alignItems: 'center', gap: 1 }}><IconUserCircle size={15}/>{row.position}</Typography>
                                </Stack>
                            </Stack>
                            <Stack alignItems='flex-end'>
                                <Stack flexDirection='row' gap={1}>
                                    <Tooltip title="Permissions">
                                        <Fab color="warning" size='small'>
                                            <IconEyeCheck />
                                        </Fab>
                                    </Tooltip>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Divider />
                    </Box>
                ))}
            </Stack>
            <Stack spacing={2} marginTop={2} alignItems='flex-end'>
                <Pagination count={10} color='primary' size='small'/>
            </Stack>
        </Box>
    )
}

export default Staffs
