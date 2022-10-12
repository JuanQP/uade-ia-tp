import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { setFieldValue } from "../../utils";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnackbar } from "notistack";
import { notification } from "../../utils";

export function UserForm({
  loading = false,
  errors = [],
  onSubmit = (user) => {},
}) {

  const { enqueueSnackbar } = useSnackbar();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    if (!nombre || !apellido || !email || !password) {
      notification(enqueueSnackbar, "Complete los campos obligatorios", "warning");
      return;
    }
    onSubmit({
      nombre,
      apellido,
      email,
      password,
      telefono: '',
      tenant: 'Cms',
    });
  }

  return (
    <Box
      component="form"
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Nombre"
            value={nombre}
            placeholder="Linus"
            error={errors.find(e => e.param === 'nombre')}
            helperText={errors.find(e => e.param === 'nombre')?.msg}
            onChange={setFieldValue(setNombre)}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Apellido"
            value={apellido}
            placeholder="Torvalds"
            error={errors.find(e => e.param === 'apellido')}
            helperText={errors.find(e => e.param === 'apellido')?.msg}
            onChange={setFieldValue(setApellido)}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="E-Mail"
            value={email}
            placeholder="tu@email.com"
            error={errors.find(e => e.param === 'email')}
            helperText={errors.find(e => e.param === 'email')?.msg}
            onChange={setFieldValue(setEmail)}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            autoComplete="new-password"
            required
            type="password"
            variant="outlined"
            label="Password"
            value={password}
            placeholder="No se lo digas a nadie 🤫"
            error={errors.find(e => e.param === 'password')}
            helperText={errors.find(e => e.param === 'password')?.msg}
            onChange={setFieldValue(setPassword)}
          />
        </Grid>
        <Grid xs={12}>
          <Box display="flex" justifyContent="end">
            <LoadingButton
              loading={loading}
              className={loading ? "" : "create-button"}
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={handleSubmit}
            >
              Agregar
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
