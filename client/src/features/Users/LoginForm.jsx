import { setFieldValue } from "@/utils";
import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from "@mui/lab";
import { Box, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { PasswordTextField } from "./PasswordTextField";


export function LoginForm({ disabled = false, errors = [], onSubmit }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      email,
      password,
    });
  }

  return (
    <Box component="form" noValidate autoComplete="off">
      <Stack spacing={2}>
        <TextField
          disabled={disabled}
          autoFocus
          label="Usuario"
          variant="outlined"
          InputProps={{
            maxLength: 255,
            endAdornment: <InputAdornment position="end">@uadeflix.com</InputAdornment>,
          }}
          error={errors.find(e => e.param === 'email')}
          helperText={errors.find(e => e.param === 'email')?.msg}
          onChange={setFieldValue(setEmail)}
        />
        <PasswordTextField
          inputProps={{maxLength: 255}}
          disabled={disabled}
          label="Contraseña"
          variant="outlined"
          error={errors.find(e => e.param === 'password')}
          helperText={errors.find(e => e.param === 'password')?.msg}
          onChange={setFieldValue(setPassword)}
        />
        <LoadingButton
          loading={disabled}
          startIcon={<LoginIcon />}
          size='large'
          variant='contained'
          type="submit"
          onClick={handleSubmit}
        >
          Ingresar
        </LoadingButton>
      </Stack>
    </Box>
  )
}
