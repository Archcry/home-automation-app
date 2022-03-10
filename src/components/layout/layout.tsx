import BorderAllIcon from '@mui/icons-material/BorderAll';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/auth-context';
import { AppBar } from './appbar';
import { DrawerHeader } from './drawer-header';
import { Main } from './main';
import { useThemeContext } from './theme-provider';

const drawerWidth = 240;

export interface LayoutProps {
  children: React.ReactElement;
}

export const Layout = ({ children }: LayoutProps) => {
  const { theme, toggleDarkMode } = useThemeContext();

  const [open, setOpen] = React.useState(false);

  return (
    <AuthContext.Consumer>
      {({ logout }) => (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <AppBar drawerWidth={drawerWidth} position="fixed" open={open}>
            <Toolbar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpen(true)}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton
                    color="inherit"
                    aria-label="toggle darkmode"
                    onClick={() => toggleDarkMode()}
                    edge="start"
                  >
                    {theme.palette.mode === 'dark' && <LightModeIcon />}
                    {theme.palette.mode === 'light' && <DarkModeIcon />}
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <DrawerHeader>
                  <IconButton onClick={() => setOpen(false)}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  <ListItem button component={Link} to="/shutter/deviceGroups">
                    <ListItemIcon>
                      <BorderAllIcon />
                    </ListItemIcon>
                    <ListItemText primary="Shutters" secondary="Control the shutters" />
                  </ListItem>
                </List>
              </Box>
              <Box>
                <Divider />
                <List>
                  <ListItem button onClick={() => logout()}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Drawer>
          <Main drawerWidth={drawerWidth}>
            <DrawerHeader />
            {children}
          </Main>
        </Box>
      )}
    </AuthContext.Consumer>
  );
};
