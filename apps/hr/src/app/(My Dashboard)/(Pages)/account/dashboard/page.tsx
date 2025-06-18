'use client'
import DepartmentUsers from '@/app/(Administrator)/components/dashboard/DepartmentUsers';
import Settings from '@/app/(Main)/components/Setting';
import CorporateServices from '@/app/components/pages/CorporateServices';
import Inbox from '@/app/components/pages/Inbox';
import RecentTransactions from '@/app/components/pages/RecentTransactions';
import Staffs from '@/app/components/pages/Staffs';
import Tickets from '@/app/components/pages/Tickets';
import UserProfile from '@/app/components/pages/UserProfile';
import PageDashboardContainer from '@/app/components/shared/container/PageDashboardContainer';
import DashboardCard from '@/app/components/shared/DashboardCard';
import withAuth from '@/app/components/shared/WithAuth';
import { Masonry } from '@mui/lab';
import { Box, Dialog, SpeedDial, SpeedDialAction, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconBell, IconBuilding, IconColorFilter, IconInbox, IconSettings, IconTicket, IconUsers } from '@tabler/icons-react';
import { useState } from 'react';

const Page = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);

    const actions = [
        { icon: <IconColorFilter stroke={1.5} size="1.3rem"/>, name: 'Settings', dialogComponent: <Settings/> },
        { icon: <IconUsers stroke={1.5} size="1.3rem"/>, name: 'Staffs', dialogComponent: <DepartmentUsers/> },
        { icon: <IconTicket stroke={1.5} size="1.3rem"/>, name: 'Tickets', dialogComponent: <Tickets/> },
        { icon: <IconInbox stroke={1.5} size="1.3rem"/>, name: 'Inbox', dialogComponent: <Inbox/> },
        { icon: <IconBell stroke={1.5} size="1.3rem"/>, name: 'Notifications', dialogComponent: <Settings/> },
        { icon: <IconBuilding stroke={1.5} size="1.3rem"/>, name: 'Corporate Services', dialogComponent: <CorporateServices/> },
    ];

    const handleActionClick = (action: any) => {
        if (action.link) {
            window.location.href = action.link;
        } else if (action.dialogComponent) {
            setDialogContent(action.dialogComponent);
            setDialogOpen(true);
        }
    };

    return (
        <PageDashboardContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Masonry columns={isMobile ? 1 : 2} spacing={isMobile ? 1 : 2}>
                    <UserProfile />
                    <DashboardCard title='Corporate Services' subtitle='Corporate services focus on supporting employees and improving productivity.'>
                        <CorporateServices />
                    </DashboardCard>
                    <DashboardCard title='Staffs'>
                        <Staffs />
                    </DashboardCard>
                    <DashboardCard title='Inbox'>
                        <Inbox />
                    </DashboardCard>
                    <DashboardCard title='Tickets'>
                        <Tickets />
                    </DashboardCard>
                    <DashboardCard title='Recent Transactions'>
                        <RecentTransactions />
                    </DashboardCard>
                </Masonry>
                <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, position: 'absolute', bottom: 16, right: 16 }}>
                    <SpeedDial
                        ariaLabel="SpeedDial"
                        icon={<IconSettings />}
                        FabProps={{
                        sx: {
                            bgcolor: 'primary.main',
                            '&:hover': {
                            bgcolor: 'primary.dark',
                            },
                        },
                        }}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                    color: 'primary.light',
                                },
                                }}
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => handleActionClick(action)}
                            />
                        ))}
                    </SpeedDial>
                </Box>
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                    {dialogContent}
                </Dialog>
            </Box>
        </PageDashboardContainer>
    )
}

export default withAuth(Page);
