'use client'
import Profile from '@/app/components/header/Profile';
import StyleCard from '@/app/components/shared/StyleCard';
import { Fab, Stack, Typography } from '@mui/material';
import { IconCalendarTime } from '@tabler/icons-react';

const UserDashboard = () => {
    return (
        <StyleCard title="">
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Profile /> 
                    <Stack flexDirection="column">
                        <Typography variant='h4' sx={{ fontWeight: "600" }}> Hello, Dom</Typography>
                        <Typography variant='subtitle1'> IT Department,  Software Developer </Typography>
                    </Stack>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Fab size='small' color="primary">
                        <IconCalendarTime/>
                    </Fab>
                </Stack>
            </Stack>
        </StyleCard>
    );
};
export default UserDashboard;
