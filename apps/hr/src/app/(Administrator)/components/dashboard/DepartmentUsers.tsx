import Profile from '@/app/components/header/Profile';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { Box, Button, Card, CardContent, Fab, FormControl, InputAdornment, OutlinedInput, Pagination, Stack, Typography } from '@mui/material';
import { IconAdjustments, IconSearch } from '@tabler/icons-react';

const DepartmentUsers = () => {
    return (
        <DashboardCard title="Accounting Staffs">
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
                <Stack gap={2}>
                    <Card>
                        <CardContent>
                            <Stack flexDirection='row' alignItems='flex-start' justifyContent='space-between' flexWrap='wrap'>
                                <Stack flexDirection='row' flexWrap='wrap'>
                                    <Stack sx={{ position: 'relative' }}>
                                        <Profile />
                                        <Box sx={{ position: 'absolute', width: 11, height: 11, backgroundColor: '#14BB38', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Box sx={{ width: 5, height: 5, backgroundColor: '#FFFFFF', borderRadius: '50%' }}></Box>
                                        </Box>
                                    </Stack>
                                    <Stack>
                                        <Typography variant='h6'>Dominic Vega</Typography>
                                        <Typography variant='body2' fontWeight={200} sx={{ color: '#9DA4BA' }}>Junior System Developer</Typography>
                                        <Typography variant='body2' fontWeight={200} sx={{ color: '#9DA4BA' }}>davega12.dv@gmail.com</Typography>
                                    </Stack>
                                </Stack>
                                <Stack alignItems='flex-end'>
                                    <Stack flexDirection='row' gap={1}>
                                        <Button size="small" variant='outlined' color='info'>View</Button>
                                        <Button size="small" variant='outlined' color='warning'>Permissions</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Stack flexDirection='row' alignItems='flex-start' justifyContent='space-between' flexWrap='wrap'>
                                <Stack flexDirection='row' flexWrap='wrap'>
                                    <Stack sx={{ position: 'relative' }}>
                                        <Profile />
                                        <Box sx={{ position: 'absolute', width: 11, height: 11, backgroundColor: '#14BB38', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Box sx={{ width: 5, height: 5, backgroundColor: '#FFFFFF', borderRadius: '50%' }}></Box>
                                        </Box>
                                    </Stack>
                                    <Stack>
                                        <Typography variant='h6'>Dominic Vega</Typography>
                                        <Typography variant='body2' fontWeight={200} sx={{ color: '#9DA4BA' }}>Junior System Developer</Typography>
                                        <Typography variant='body2' fontWeight={200} sx={{ color: '#9DA4BA' }}>davega12.dv@gmail.com</Typography>
                                    </Stack>
                                </Stack>
                                <Stack alignItems='flex-end'>
                                    <Stack flexDirection='row' gap={1}>
                                        <Button size="small" variant='outlined' color='info'>View</Button>
                                        <Button size="small" variant='outlined' color='warning'>Permissions</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Stack flexDirection='row' alignItems='flex-start' justifyContent='space-between' flexWrap='wrap'>
                                <Stack flexDirection='row' flexWrap='wrap'>
                                    <Stack sx={{ position: 'relative' }}>
                                        <Profile />
                                        <Box sx={{ position: 'absolute', width: 11, height: 11, backgroundColor: '#14BB38', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Box sx={{ width: 5, height: 5, backgroundColor: '#FFFFFF', borderRadius: '50%' }}></Box>
                                        </Box>
                                    </Stack>
                                    <Stack>
                                        <Typography variant='h6'>Dominic Vega</Typography>
                                        <Typography variant='body2' fontWeight={200} sx={{ color: '#9DA4BA' }}>Junior System Developer</Typography>
                                        <Typography variant='body2' fontWeight={200} sx={{ color: '#9DA4BA' }}>davega12.dv@gmail.com</Typography>
                                    </Stack>
                                </Stack>
                                <Stack alignItems='flex-end'>
                                    <Stack flexDirection='row' gap={1}>
                                        <Button size="small" variant='outlined' color='info'>View</Button>
                                        <Button size="small" variant='outlined' color='warning'>Permissions</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
                <Stack spacing={2} marginTop={2} alignItems='flex-end'>
                    <Pagination count={10} color='primary' size='small'/>
                </Stack>
            </Box>
        </DashboardCard>
    )
}

export default DepartmentUsers
