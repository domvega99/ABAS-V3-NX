'use client'
import CorporateServices from '@/app/(Administrator)/components/dashboard/CorporateServices';
import DepartmentUsers from '@/app/(Administrator)/components/dashboard/DepartmentUsers';
import Inbox from '@/app/(Administrator)/components/dashboard/Inbox';
import RecentTransactions from '@/app/(Administrator)/components/dashboard/RecentTransactions';
import Tickets from '@/app/(Administrator)/components/dashboard/Tickets';
import UserDashboard from '@/app/(Administrator)/components/dashboard/UserDashboard';
import Settings from '@/app/(Main)/components/Setting';
import PageDashboardContainer from '@/app/components/shared/container/PageDashboardContainer';
import withAuth from '@/app/components/shared/WithAuth';
import { Masonry } from '@mui/lab';
import { Box, Dialog, SpeedDial, SpeedDialAction, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconBell, IconBuilding, IconInbox, IconPlus, IconSettings, IconTicket, IconUsers } from '@tabler/icons-react';
import { useState } from 'react';

const Page = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const actions = [
    { icon: <IconSettings stroke={1.5} size="1.3rem"/>, name: 'Settings', dialogComponent: <Settings/> },
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
          <UserDashboard />
          <CorporateServices />
          <DepartmentUsers />
          <Inbox />
          <Tickets />
          <RecentTransactions />
        </Masonry>
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, position: 'absolute', bottom: 16, right: 16 }}>
          <SpeedDial
            ariaLabel="SpeedDial"
            icon={<IconPlus />}
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
