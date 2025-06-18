import React from 'react'
import DashboardCard from '../../../components/shared/DashboardCard'
import { Box, Fab, LinearProgress, Stack, Typography } from '@mui/material'
import { IconPlus } from '@tabler/icons-react'

const Tickets = () => {
  return (
    <DashboardCard title="My Tickets">
        <Box>
            <Stack alignItems="end">
                <Fab color="primary" size='small'>
                    <IconPlus />
                </Fab>
            </Stack>
            <Stack gap={2}>
                <Typography variant='subtitle2'>Work In Progress : 50%</Typography>
                <LinearProgress variant="determinate" value={50} />
                <Typography variant='subtitle2'>Work In Progress : 0%</Typography>
                <LinearProgress variant="determinate" value={0} />
                <Typography variant='subtitle2'>Work In Progress : 75%</Typography>
                <LinearProgress variant="determinate" value={75} />
                <Typography variant='subtitle2'>Work In Progress : 100%</Typography>
                <LinearProgress variant="determinate" value={100} />
            </Stack>
        </Box>
    </DashboardCard>
  )
}

export default Tickets
