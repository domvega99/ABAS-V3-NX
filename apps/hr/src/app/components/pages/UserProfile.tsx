'use client'
import Profile from '@/app/components/header/Profile';
import StyleCard from '@/app/components/shared/StyleCard';
import { Fab, Stack, Typography } from '@mui/material';
import { IconCalendarTime, IconMail, IconStack, IconStack2, IconUserCircle } from '@tabler/icons-react';

const data = {
    first_name: 'Dominic',
    department: 'IT Department',
    position: 'Junior System Developer',
    email: 'davega12.dv@gmail.com'
}

const UserProfile = () => {
    return (
        <StyleCard title="">
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Profile /> 
                    <Stack flexDirection="column">
                        <Typography variant='h4' sx={{ fontWeight: "600" }}> Hello, {data.first_name} </Typography>
                        <Stack flexDirection="row" flexWrap='wrap'>
                            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: 1, marginRight: 2 }}> <IconStack2 size={18}/>{data.department}</Typography>
                            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: 1, marginRight: 2 }}> <IconUserCircle size={18}/>{data.position}</Typography>
                            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: 1, marginRight: 2 }}> <IconMail size={18}/>{data.email}</Typography>
                        </Stack>
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
export default UserProfile;
