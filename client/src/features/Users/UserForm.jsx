import { zodResolver } from '@hookform/resolvers/zod';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordTextField } from './PasswordTextField';

const schema = z.object({
  nombre: z.string().min(1).max(255),
  apellido: z.string().min(1).max(255),
  email: z.string().email().min(1).max(255),
  password: z.string().min(1).max(255),
});

const DEFAULT_VALUES = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
};

export function UserForm({
  loading = false,
  onSubmit = (user) => {},
}) {

  const { formState, register, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  function handleUserSubmit(formValues) {
    onSubmit({ ...formValues });
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(handleUserSubmit)}
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <TextField
            inputProps={{maxLength: 255}}
            fullWidth
            required
            variant="outlined"
            label="Nombre"
            placeholder="Linus"
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
            {...register('nombre')}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            inputProps={{maxLength: 255}}
            fullWidth
            required
            variant="outlined"
            label="Apellido"
            placeholder="Torvalds"
            error={!!errors.apellido}
            helperText={errors.apellido?.message}
            {...register('apellido')}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            inputProps={{maxLength: 255}}
            fullWidth
            required
            variant="outlined"
            label="E-Mail"
            placeholder="tu@email.com"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <PasswordTextField
            fullWidth
            required
            inputProps={{maxLength: 255}}
            autoComplete="new-password"
            type="password"
            variant="outlined"
            label="Password"
            placeholder="No se lo digas a nadie 🤫"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </Grid>
        <Grid xs={12}>
          <Box display="flex" justifyContent="end">
            <LoadingButton
              type="submit"
              loading={loading}
              className={loading ? "" : "create-button"}
              variant="contained"
              startIcon={<PersonAddIcon />}
            >
              Agregar
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
