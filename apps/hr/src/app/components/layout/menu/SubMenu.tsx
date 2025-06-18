import CorporateServices from '@/app/(Administrator)/components/dashboard/CorporateServices';
import Inbox from '@/app/(Administrator)/components/dashboard/Inbox';
import Tickets from '@/app/(Administrator)/components/dashboard/Tickets';
import Settings from '@/app/(Main)/components/Setting';
import { Badge, Box, Dialog, Stack, Tooltip } from '@mui/material';
import { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { IconBellRinging, IconBuilding, IconChessKing, IconInbox, IconSettings, IconTicket } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -6,
      top: -6,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}));

const modules = [
    {
        title: "Inbox",
        icon: <StyledBadge badgeContent={4} color="error"><IconInbox stroke={1.5} size="1.3rem"/></StyledBadge>,
        dialogComponent: <Inbox />
    },
    {
        title: "Notification",
        icon: <StyledBadge badgeContent={4} color="error"><IconBellRinging stroke={1.5} size="1.3rem"/></StyledBadge>,
        dialogComponent: <Settings />
    },
    {
        title: "Tickets",
        icon: <IconTicket stroke={1.5} size="1.3rem"/>,
        dialogComponent: <Tickets />
    },
    {
        title: "Corporate Services",
        icon: <IconBuilding stroke={1.5} size="1.3rem"/>,
        dialogComponent: <CorporateServices />
    },
    {
        title: "Administrator",
        icon: <IconChessKing stroke={1.5} size="1.3rem"/>,
        link: '/administrator/dashboard'
    },
    {
        title: "Settings",
        icon: <IconSettings stroke={1.5} size="1.3rem"/>,
        dialogComponent: <Settings />
    },
];

const SubMenu = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);
    const router = useRouter();

    const handleActionClick = (action: any) => {
        if (action.link) {
            router.push(action.link);
        } else if (action.dialogComponent) {
            setDialogContent(action.dialogComponent);
            setDialogOpen(true);
        }
    };

    const handleClose = () => {
        setDialogOpen(false);
        setDialogContent(null);
    };

    return (
        <Stack flexDirection='row' gap={3}>
            {modules.map((item, index) => (
                <Stack justifyContent='center' alignItems='center' gap={1} width='100%' key={index}>
                    <Tooltip title={item.title} placement="top">
                        <Box
                            onClick={() => handleActionClick(item)}
                            sx={{
                                cursor: 'pointer',
                                width: { xs: 30, md: 40 }, 
                                height: { xs: 30, md: 40 }, 
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                bgcolor: 'primary.main',
                                color: '#FFFFFF',
                                borderRadius: 50, 
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)', 
                                    backgroundColor: 'primary.dark'
                                },
                            }}
                        >
                            {item.icon}
                        </Box>
                    </Tooltip>
                </Stack>
            ))}
            <Dialog open={dialogOpen} onClose={handleClose}>
                {dialogContent}
            </Dialog>
        </Stack>
    );
};

export default SubMenu;
