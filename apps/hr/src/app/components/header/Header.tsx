import ModeToggleButton from '@/app/(Main)/components/Interfaces/ModeToggleButton';
import { AppBar, Box, IconButton, InputBase, Paper, Stack, Toolbar, Tooltip, styled } from '@mui/material';
import { IconCategory, IconMenu2, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import React from 'react';
import FabComponent from '../ui/FabComponent';
import Profile from './Profile';

interface HeaderProps {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void; 
  toggleSidebarCollapse: () => void; 
}

const Header = ({ toggleMobileSidebar, toggleSidebarCollapse }: HeaderProps) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: pathDirect == '/' ? theme.palette.primary.main : 'transparent',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    zIndex: 10,
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <Stack gap={1} flexDirection="row">
          <Stack onClick={toggleMobileSidebar} sx={{ display: { xs: pathDirect == '/' ? "none" : "inline", lg: "none", }, }}>
            <FabComponent>
              <IconMenu2 stroke={1.5} size="1.3rem"/>
            </FabComponent>
          </Stack>
          <Stack sx={{ display: pathDirect !== '/' ? 'inline' : 'none' }}>
            <Stack onClick={toggleSidebarCollapse} sx={{ display: { lg: "inline", xs: "none" }, marginRight: '10px' }}>
              <FabComponent>
                <IconMenu2 stroke={1.5} size="1.3rem"/>
              </FabComponent>
            </Stack>
            <Link href='/'>
              <FabComponent>
                <Tooltip title="Home Menu" placement="bottom">
                  <IconCategory stroke={1.5} size="1.3rem"/>
                </Tooltip>
              </FabComponent>
            </Link>
          </Stack>
          <FabComponent>
            <ModeToggleButton />
          </FabComponent>
          <Stack sx={{ display: { lg: "inline", xs: "none" }, marginRight: '10px' }}>
            <Paper
              component="form"
              sx={{ p: '0px 5px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '50px' }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Quick Search"
              />
              <IconButton type="button" sx={{ p: '10px', color: 'text.primary' }} aria-label="search">
                <IconSearch stroke={1.5} size="1.3rem"/>
              </IconButton>
            </Paper>
          </Stack>
          <Stack sx={{ display: { lg: "none", xs: "inline" }, marginRight: '10px' }}>
            <FabComponent>
              <IconSearch stroke={1.5} size="1.3rem"/>
            </FabComponent>
          </Stack>
        </Stack>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func.isRequired, 
};

export default Header;
