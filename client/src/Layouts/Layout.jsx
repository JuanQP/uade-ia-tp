import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieIcon from '@mui/icons-material/Movie';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import WebIcon from '@mui/icons-material/Web';
import { useLocation, Link } from 'react-router-dom';

const links = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    label: 'Contenido',
    to: '/content',
    icon: <MovieIcon />,
  },
  {
    label: 'Carruseles',
    to: '/carousels',
    icon: <ListIcon />,
  },
  {
    label: 'Landing pages',
    to: '/landing-pages',
    icon: <WebIcon />,
  },
  {
    label: 'Log out',
    to: '/login',
    icon: <LogoutIcon />,
  },
];

const drawerWidth = 240;

export function Layout({children, ...props}) {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            // backgroundColor: 'blue',
          },
        }}
      >
        <List>
          {/* <Toolbar /> */}
          {links.map(item => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton selected={location.pathname === item.to} component={Link} to={item.to}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {/* Page content is placed here */}
        {children}
      </Box>
    </Box>
  )
}
