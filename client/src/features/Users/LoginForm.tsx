import { FieldErrors } from '@/types';
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

type LoginFormValues = typeof DEFAULT_VALUES;

type LoginFormProps = {
  disabled: boolean;
  errors: FieldErrors;
  loading: boolean;
  onSubmit: (formValues: LoginFormValues) => void;
}

export function LoginForm({ disabled = false, errors = {}, loading, onSubmit } : LoginFormProps) {

  const { register, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  function handleLoginSubmit(formValues: LoginFormValues) {
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
          error={!!errors.email}
          helperText={errors.email}
          {...register('email')}
        />
        <PasswordTextField
          disabled={disabled}
          label="Contraseña"
          variant="outlined"
          inputProps={{ maxLength: 255 }}
          error={!!errors.password}
          helperText={errors.password}
          {...register("password")}
        />
        <LoadingButton
          variant='gradient-success'
          disabled={disabled}
          loading={loading}
          startIcon={<LoginIcon />}
          size='large'
          type="submit"
        >
          Ingresar
        </LoadingButton>
      </Stack>
    </Box>
  )
}
