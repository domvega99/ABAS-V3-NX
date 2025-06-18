import ModeToggleButton from '@/app/(Main)/components/Interfaces/ModeToggleButton'
import ThemeToggleButton from '@/app/(Main)/components/Interfaces/ThemeToggleButton'
import DashboardCard from '@/app/components/shared/DashboardCard'
import FabComponent from '@/app/components/ui/FabComponent'
import { Box, Stack, Typography } from '@mui/material'
import MainMenuOrientation from './Interfaces/MainMenuOrientation'
import SubMenuOrientation from './Interfaces/SubMenuOrientation'

const Settings = () => {
  return (
    <DashboardCard title="Settings">
        <Box sx={{ width: '600px', height: '600px' }}>
            <Stack gap={3}>
                <Typography variant='body1'>Preset Color</Typography>
                <ThemeToggleButton />
                <Typography variant='body1'>Theme Mode</Typography>
                <FabComponent>
                    <ModeToggleButton />
                </FabComponent>
                <Typography variant='body1'>Main Menu Orientation</Typography>
                <MainMenuOrientation />
                <Typography variant='body1'>Menu Orientation</Typography>
                <SubMenuOrientation />
            </Stack>
        </Box>
    </DashboardCard>
  )
}

export default Settings
