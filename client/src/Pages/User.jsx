import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Layout } from "../Layouts/Layout";
import { UserForm } from "./Users/UserForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkToken, notification } from "../utils";
import { useSnackbar } from "notistack";

export function User() {

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
      <Typography sx={{fontSize: 24}}>Agregar nuevo curador</Typography>
      <Paper style={{
        marginTop: 10,
        padding: 12
      }}>
        <UserForm
          loading={waiting}
          errors={errors}
          onSubmit={handleCarouselSubmit}
        />
      </Paper>
    </Layout>
  )
}
