import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

export const LoginEmailTextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return (
    <TextField
      {...props}
      ref={ref}
      type="email"
      inputProps={{
        maxLength: 255,
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">@uadeflix.com</InputAdornment>,
      }}
    />
  )
});
