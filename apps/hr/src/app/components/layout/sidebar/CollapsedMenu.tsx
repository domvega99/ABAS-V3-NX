import Menuitems from '@/app/(Administrator)/layout/sidebar/MenuItems';
import { Box, Fab, Tooltip } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CollapsedMenu = () => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0' }}>
      {Menuitems.map((item, index) => {
        if (item.navlabel) {
          return (
            // <div key={index} style={{ width: '100%', margin: '20px 0' }} />
            <div key={index}></div>
          );
        }
        const isSelected = pathDirect === item.href || pathDirect.startsWith(`${item.href}/`);
        return (
          <Tooltip title={item.title} key={item.id} placement="right">
            <Link href={item.href || "#"}>
              <Fab
                size="small"
                aria-label={item.title}
                sx={{
                  backgroundColor: isSelected ? 'primary.main' : 'background.default', 
                  color: isSelected ? 'primary.light' : 'inherit',                    
                  marginBottom: '10px',
                  '&:hover': {
                    backgroundColor: "primary.main", 
                    color: 'primary.light'
                  }
                }}
              >
                {item.icon && <item.icon stroke={1.5} size="1.3rem" />} 
              </Fab>
            </Link>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default CollapsedMenu;
