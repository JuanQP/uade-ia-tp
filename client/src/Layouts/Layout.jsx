import '../App.css';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieIcon from '@mui/icons-material/Movie';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import WebIcon from '@mui/icons-material/Web';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const links = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: <DashboardIcon className="side-panel-color" />,
  },
  {
    label: 'Contenido',
    to: '/contents',
    icon: <MovieIcon className="side-panel-color" />,
  },
  {
    label: 'Carruseles',
    to: '/carousels',
    icon: <ListIcon className="side-panel-color" />,
  },
  {
    label: 'Landing pages',
    to: '/landing-pages',
    icon: <WebIcon className="side-panel-color" />,
  },
  {
    label: 'Log out',
    to: '/logout',
    icon: <LogoutIcon className="side-panel-color" />,
  },
];

const drawerWidth = 240;

export function Layout({children, ...props}) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/');
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        anchor="left"
        className="side-panel"
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
          {/* <Toolbar /> */}
          {links.map(item => {
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
        sx={{ flexGrow: 1, bgcolor: '#E4E6EB', minHeight: '100vh', p: 3 }}
      >
        {/* Page content is placed here */}
        {children}
      </Box>
    </Box>
  )
}
