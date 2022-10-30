import { InputAdornment, TextField } from "@mui/material";
import { forwardRef } from "react";

export const LoginEmailTextField = forwardRef((props, ref) => {
  return (
    <TextField
      {...props}
      ref={ref}
      type="email"
      InputProps={{
        maxLength: 255,
        endAdornment: <InputAdornment position="end">@uadeflix.com</InputAdornment>,
      }}
    />
  )
});
