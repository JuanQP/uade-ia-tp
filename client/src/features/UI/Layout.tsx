import { useUserContext } from '@hooks/UserContext';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { userAPI } from '../Users';
import './App.css';
import { ListItemLink } from './ListItemLink';

const links = [
  {
    label: 'Home',
    to: '/home',
    icon: <HomeIcon />,
  },
  {
    label: 'Contenido',
    to: '/contents',
    icon: <MovieIcon />,
  },
  {
    label: 'Carruseles',
    to: '/carousels',
    icon: <ViewCarouselIcon />,
  },
  {
    label: 'Curadores',
    to: '/register',
    icon: <PersonIcon />,
  },
  {
    label: 'Log out',
    to: '/logout',
    icon: <LogoutIcon />,
  },
];

const drawerWidth = 240;

const styles = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      backgroundColor: 'background.drawer',
      borderRight: 0,
      boxSizing: 'border-box',
      width: drawerWidth,
    },
  },
};

export function Layout() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const awaitVerifyToken = async () => {
      try {
        await userAPI.verifyToken();
      } catch (error: any) {
        navigate('/', {
          state: { message: error.response?.data?.message ?? error.message },
        });
      }
    }
    const nombre = localStorage.getItem('nombre');
    if(nombre) {
      setUser({ nombre });
    }
    // Always check token when route changes
    awaitVerifyToken();
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Helmet>
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Helmet>
      <AppBar position="fixed" sx={{display: isMdUp ? 'none' : 'flex'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => setDrawerOpen(previous => !previous)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        open={isMdUp || drawerOpen}
        variant={isMdUp ? "permanent" : "temporary"}
        anchor="left"
        onClose={() => setDrawerOpen(false)}
        sx={styles.drawer}
      >
        <List>
          <ListItem>
            <ListItemText
              primary={"UADEFLIX CMS"}
              secondary={user.nombre}
              primaryTypographyProps={{
                color: theme.palette.primary.light,
              }}
              secondaryTypographyProps={{
                color: theme.palette.primary.main,
              }}
            />
          </ListItem>
          {links.map(item => (
            <ListItemLink
              key={item.label}
              linkItem={item}
              pathname={location.pathname}
              onClick={() => setDrawerOpen(false)}
            />
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, minHeight: '100vh' }}
      >
        {!isMdUp && <Toolbar />}
        <Box py={2}>
          {/* Page content is displayed here */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
