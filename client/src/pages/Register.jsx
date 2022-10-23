import { checkToken, notification } from "@/utils";
import { Layout } from "@features/UI";
import { UserForm } from "@features/Users";
import { Paper, Typography } from "@mui/material";
import axios from 'axios';
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  paper: {
    marginTop: 10,
    padding: 12
  },
  typography: {
    fontSize: 24
  },
}

export function Register() {

  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState([])

  useEffect(() => {
    checkToken(navigate);
  }, []);

  async function handleCarouselSubmit(user) {
    setWaiting(true);
    try {
      await axios.post('/api/register', user);
      notification(enqueueSnackbar, `Usuario ${user.email} creado correctamente`, "success");
      navigate('/home');
    } catch (error) {
      console.error("Server error", error);
      setErrors(error.response?.data?.errors ?? []);
      notification(enqueueSnackbar, `Error al intentar crear usuario`, "error");
    }
    finally {
      setWaiting(false);
    }
  }

  return (
    <Layout>
      <Typography sx={styles.typography}>Agregar nuevo curador</Typography>
      <Paper style={styles.paper}>
        <UserForm
          loading={waiting}
          errors={errors}
          onSubmit={handleCarouselSubmit}
        />
      </Paper>
    </Layout>
  )
}
