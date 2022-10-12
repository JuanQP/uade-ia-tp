import '../App.css';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import MenuIcon from "@mui/icons-material/Menu";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../hooks/UserContext';

const links = [
  {
    label: 'Home',
    to: '/home',
    icon: <HomeIcon className="side-panel-color" />,
  },
  {
    label: 'Contenido',
    to: '/contents',
    icon: <MovieIcon className="side-panel-color" />,
  },
  {
    label: 'Carruseles',
    to: '/carousels',
    icon: <ViewCarouselIcon className="side-panel-color" />,
  },
  {
    label: 'Curadores',
    to: '/users',
    icon: <PersonIcon className="side-panel-color" />,
  },
  {
    label: 'Log out',
    to: '/logout',
    icon: <LogoutIcon className="side-panel-color" />,
  },
];

const drawerWidth = 240;

export function Layout({ children }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const nombre = localStorage.getItem('nombre');
    if(!token) {
      navigate('/');
      return;
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    if(nombre) {
      setUser({ nombre });
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
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
        className="side-panel"
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
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
          {links.map(item => {
            // It checks if current location starts with this element URL
            const regexp = new RegExp(`^${item.to}`, 'i');
            const match = regexp.test(location.pathname);
            return (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={match}
                  component={Link}
                  to={item.to}
                  className={!match ? undefined : "side-panel-color-selected"}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText className="side-panel-color" primary={item.label} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        className='bg-dots'
        sx={{ flexGrow: 1, minHeight: '100vh', p: 3 }}
      >
        {!isMdUp && <Toolbar />}
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Box maxWidth="lg" sx={{flex: 1}}>
            {/* Page content is placed here */}
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
