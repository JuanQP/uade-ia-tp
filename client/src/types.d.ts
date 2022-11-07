export declare module '@mui/material/Button' {
  export interface ButtonPropsVariantOverrides {
    ['gradient-success']: true;
    ['gradient']: true;
  }
}

export declare module '@mui/material/styles' {
  export interface TypeBackground {
    drawer: string;
    loginOk: string;
  }
}

type EnqueueSnackbarType = (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;

type ErrorResponse = {
  message: string;
  errors: {param: string, msg: string}[];
}

type FieldErrors = {
  [key: string] : string;
}

type ErrorObject = {
  errorMessage: string;
  serverMessage: string;
  fields: FieldErrors;
}
