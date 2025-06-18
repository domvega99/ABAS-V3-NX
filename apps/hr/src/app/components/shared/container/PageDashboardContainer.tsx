import { RootState } from "@/app/state/store";
import { Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const PageDashboardContainer = ({ children, className }: Props) => {
  const subMenuStyle = useSelector((state: RootState) => state.subMenuStyle.SubMenuStyle);

  return (
    <Box 
      sx={{ 
        height: {
          xs: '100vh',
          lg: subMenuStyle === 'Sidebar' ? '88vh' : '82vh',
        },
        overflowY: 'auto',
          '&::-webkit-scrollbar': {
              width: '5px',
              height: '5px'
          },
          '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#546E7A',
              borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
              backgroundColor: 'background.paper',
              borderRadius: '5px',
          },
      }}
    >  
        {children}
    </Box>
  );
};

export default PageDashboardContainer;
