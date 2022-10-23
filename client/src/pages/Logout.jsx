import { Layout } from "@features/UI";
import { useUserContext } from "@hooks/UserContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Logout() {

  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUserContext();

  useEffect(() => {
    const logout = async () => {
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
    };

    logout();
  }, []);

  return (
    <Layout>
      <Box style={{display: 'flex', alignItems: 'center', gap: '1em'}}>
        <CircularProgress />
        <Typography>Saliendo...</Typography>
      </Box>
    </Layout>
  )
}
