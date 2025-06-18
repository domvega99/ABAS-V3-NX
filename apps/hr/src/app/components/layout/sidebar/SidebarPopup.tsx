import Logo from '@/app/components/shared/logo/Logo';
import { Box, Drawer } from '@mui/material';
import SidebarItems from './SidebarItems';

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarCollapsed: boolean; 
  Menuitems: any[];
}

const SidebarPopup = ({
    isMobileSidebarOpen,
    onSidebarClose,
    isSidebarCollapsed, 
    Menuitems,
}: ItemType) => {
    const sidebarWidth = isSidebarCollapsed ? '60px' : '300px';
    return (
        <Drawer
            anchor="left"
            open={isMobileSidebarOpen}
            onClose={onSidebarClose}
            variant="temporary"
            PaperProps={{
                sx: {
                width: sidebarWidth,
                boxShadow: (theme) => theme.shadows[8],
                },
        }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0' }}>
                <Logo collapsed={isSidebarCollapsed} />
            </Box>
            <SidebarItems Menuitems={Menuitems} />
        </Drawer>
    );
};

export default SidebarPopup;
