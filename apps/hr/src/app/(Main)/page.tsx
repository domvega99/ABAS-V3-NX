'use client'
import { Box, Dialog, SpeedDial, SpeedDialAction, useTheme } from '@mui/material'
import { IconChessKing, IconColorFilter, IconSettings } from '@tabler/icons-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Accounting from '../assets/icon/accounting.png'
import Finance from '../assets/icon/finance.png'
import HR from '../assets/icon/human_resources.png'
import Inventory from '../assets/icon/inventory.png'
import Icon from '../assets/icon/logoicon.png'
import Purchasing from '../assets/icon/purchasing.png'
import Header from '../components/header/Header'
import withAuth from '../components/shared/WithAuth'
import { initializeMenuStyle } from '../state/slice/styles/menuStyleSlice'
import { RootState } from '../state/store'
import MiddleMainMenu from './components/Interfaces/MiddleMainMenu'
import RightSideMainMenu from './components/Interfaces/RightSideMainMenu'
import Settings from './components/Setting'
import SubMenu from '../components/layout/menu/SubMenu'

const modules = [
  {
    title: "Human Resources",
    icon: <Image alt='icon' src={HR} width={50} />,
    link: "/",
  },
  {
    title: "Payroll",
    icon: <Image alt='icon' src={Icon} width={50} />,
    link: "/",
  },
  {
    title: "Purchasing",
    icon: <Image alt='icon' src={Purchasing} width={50} />,
    link: "/",
  },
  {
    title: "Inventory",
    icon: <Image alt='inventory' src={Inventory} width={50} />,
    link: "/",
  },
  {
    title: "Accounting",
    icon: <Image alt='accounting' src={Accounting} width={50} />,
    link: "/accounting/dashboard",
  },
  {
    title: "Finance",
    icon: <Image alt='icon' src={Finance} width={50} />,
    link: "/",
  },
  {
    title: "Marketing & Operations",
    icon: <Image alt='icon' src={Icon} width={50} />,
    link: "/",
  },
  {
    title: "Asset Management",
    icon: <Image alt='icon' src={Icon} width={50} />,
    link: "/",
  },
  {
    title: "Compliance",
    icon: <Image alt='icon' src={Icon} width={50} />,
    link: "/",
  },
  {
    title: "IT Helpdesk",
    icon: <Image alt='icon' src={Icon} width={50} />,
    link: "/",
  },
  {
    title: "Administrator",
    icon: <Image alt='icon' src={Icon} width={50} />,
    link: "/account/dashboard",
  },
]

const actions = [
  { icon: <IconChessKing stroke={1.5} size="1.3rem"/>, name: 'Administrator', link: '/administrator/dashboard' },
  { icon: <IconColorFilter stroke={1.5} size="1.3rem"/>, name: 'Settings', dialogComponent: <Settings/> },
];

const Page = () => {
  const theme = useTheme();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // const handleActionClick = (action: any) => {
  //   if (action.link) {
  //     window.location.href = action.link;
  //   } else if (action.dialogComponent) {
  //     setDialogContent(action.dialogComponent);
  //     setDialogOpen(true);
  //   }
  // };

  const dispatch = useDispatch();
  const menuStyle = useSelector((state: RootState) => state.menuStyle.menuStyle);

  useEffect(() => {
    dispatch(initializeMenuStyle());
  }, [dispatch]);


  return (
    <Box
      style={{
        height: '100vh',
        position: 'relative',
        background: `linear-gradient(to right bottom, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
      }}
    >
      <Header
        toggleMobileSidebar={toggleMobileSidebar}
        toggleSidebarCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
      />
      <Box>
        {menuStyle === 'RightSideMainMenu' ? (
          <RightSideMainMenu MainMenuItems={modules} />
        ) : (
          <MiddleMainMenu MainMenuItems={modules} />
        )}
        {/* <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, position: 'absolute', bottom: 16, right: 16 }}>
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
        </Box> */}
      </Box>
      <Box sx={{ position: 'absolute', bottom: 15, right: 15 }}>
        <SubMenu />
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        {dialogContent}
      </Dialog>
    </Box>
  );
};

export default withAuth(Page)



