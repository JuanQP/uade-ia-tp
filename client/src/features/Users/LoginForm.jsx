import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginEmailTextField } from './LoginEmailTextField';
import { PasswordTextField } from "./PasswordTextField";

const DEFAULT_VALUES = {
  email: '',
  password: '',
};

export function LoginForm({ disabled = false, errors = [], onSubmit }) {

  const { register, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  function handleLoginSubmit(formValues) {
    onSubmit(formValues);
  }

  return (
    <Box
      noValidate
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(handleLoginSubmit)}
    >
      <Stack spacing={2}>
        <LoginEmailTextField
          disabled={disabled}
          autoFocus
          label="Usuario"
          variant="outlined"
          error={errors.find(e => e.param === 'email')}
          helperText={errors.find(e => e.param === 'email')?.msg}
          {...register('email')}
        />
        <PasswordTextField
          disabled={disabled}
          label="Contraseña"
          variant="outlined"
          InputProps={{ maxLength: 255 }}
          error={errors.find(e => e.param === 'password')}
          helperText={errors.find(e => e.param === 'password')?.msg}
          {...register("password")}
        />
        <LoadingButton
          loading={disabled}
          startIcon={<LoginIcon />}
          size='large'
          variant='contained'
          type="submit"
        >
          Ingresar
        </LoadingButton>
      </Stack>
    </Box>
  )
}
