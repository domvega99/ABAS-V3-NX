import Logo from '@/app/components/shared/logo/Logo';
import { Box, Drawer } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CollapsedMenu from './CollapsedMenu';
import SidebarItems from './SidebarItems';

interface ItemType {
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean; 
  Menuitems: any[];
}

const Sidebar = ({
  onSidebarClose,
  isSidebarOpen,
  isSidebarCollapsed, 
  Menuitems,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const sidebarWidth = isSidebarCollapsed ? '60px' : '300px';
  const SidebarContent = isSidebarCollapsed ? <CollapsedMenu /> : <SidebarItems onMenuItemClick={onSidebarClose} Menuitems={Menuitems}/>;

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          transition: 'width 0.5s',
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
              zIndex: 0,
              backgroundColor: 'background.default', 
              backdropFilter: 'blur(4px)',
            },
          }}
        >
          <Box sx={{ height: '100%', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0' }}>
              <Logo collapsed={isSidebarCollapsed} /> 
            </Box>
            <Box>
              {SidebarContent}
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }
};

export default Sidebar;
