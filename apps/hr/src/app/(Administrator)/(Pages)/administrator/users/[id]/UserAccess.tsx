import { Button, Paper, Stack, styled, Typography } from '@mui/material';
import React from 'react'

const PaperContainer = styled(Paper)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    padding: theme.spacing(2),
    ...theme.typography.body2,
}));

const UserAccess = () => {
  return (
    <Stack gap={2}>
        <PaperContainer square={false}>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between' flexWrap='wrap' gap={2}>
                <Stack>
                    <Typography variant='h5'>Reset Password</Typography>
                    <Typography variant='body2'>User reset password</Typography>
                </Stack>
                <Button color='error' variant='outlined'>Reset Password</Button>
            </Stack>
        </PaperContainer>
        <PaperContainer square={false}>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                <Stack>
                    <Typography variant='h5'>Accounts</Typography>
                    <Typography variant='body2'>Active and deactivate user account.</Typography>
                </Stack>
                <Button color='success' variant='outlined'>Activate</Button>
            </Stack>
        </PaperContainer>
    </Stack>
  )
}

export default UserAccess
