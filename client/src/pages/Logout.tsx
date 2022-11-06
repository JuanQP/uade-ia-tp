import { userAPI } from "@/features/Users";
import { useUserContext } from "@hooks/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export function Logout() {

  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUserContext();

  async function handleLogoutClick() {
    try {
      await userAPI.logout();
      setUser({});
      const state = location.state ?? undefined;
      navigate('/login', { state });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container maxWidth="md">
      <Card>
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
    </Container>
  )
}
