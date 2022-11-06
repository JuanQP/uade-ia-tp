import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { forwardRef, useState } from 'react';

export const PasswordTextField = forwardRef<HTMLInputElement, TextFieldProps>(({ ...props }, ref) => {

  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(previous => !previous);
  }

  return (
    <TextField
      {...props}
      ref={ref}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
})
