import { FieldErrorList } from "@/features/UI/FieldErrorList";
import { errorToObject, notification } from "@/utils";
import { userAPI, UserForm } from "@features/Users";
import { Container, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
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
  const [errors, setErrors] = useState({})

  async function handleCarouselSubmit(user: User) {
    setWaiting(true);
    setErrors({});
    try {
      await userAPI.register(user);
      notification(enqueueSnackbar, `Usuario ${user.email} creado correctamente`, "success");
      navigate('/users');
    } catch (error) {
      if(error instanceof Error) {
        console.error("Server error", error);
        const errors = errorToObject(error);
        setErrors(errors.fields);
        notification(enqueueSnackbar, `Error al intentar crear usuario`, "error");
      }
    }
    finally {
      setWaiting(false);
    }
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight={100}>Nuevo curador</Typography>
      <Paper style={styles.paper}>
        <UserForm loading={waiting} onSubmit={handleCarouselSubmit}/>
        <FieldErrorList errors={errors} />
      </Paper>
    </Container>
  )
}
