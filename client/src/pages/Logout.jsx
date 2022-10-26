import { useUserContext } from "@hooks/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const styles = {
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export function Logout() {

  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUserContext();

  async function handleLogoutClick() {
    try {
      await axios.post('/api/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('nombre');
      setUser({});
      axios.defaults.headers.common['Authorization'] = ``;
      const state = location.state ?? undefined;
      navigate('/login', { state });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box style={styles.box}>
      <Card sx={{ minWidth: '25vw' }}>
        <CardContent>
          <Typography>
            Hola, <strong>{user.nombre}</strong>. ¿Estás seguro de cerrar sesión? 🤔
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogoutClick}
          >
            Cerrar sesión
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
