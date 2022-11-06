import { Slide, SlideProps } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { OptionsObject, SnackbarKey, SnackbarMessage, VariantType } from 'notistack';

type EnqueueSnackbarType = (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;

type ErrorResponse = {
  message: string;
  errors: {param: string, msg: string}[];
}

export type FieldErrors = {
  [key: string] : string;
}

export type ErrorObject = {
  errorMessage: string;
  serverMessage: string;
  fields: FieldErrors;
}

export const snackbarOptions: OptionsObject = {
  variant: 'info',
  anchorOrigin: {vertical: 'top', horizontal: 'right'},
  TransitionComponent: (props: SlideProps) => (<Slide {...props} direction="down" />),
};

export function notification(
  enqueue: EnqueueSnackbarType,
  message = '',
  variant: VariantType = 'info'
) {
  enqueue(message, {
    ...snackbarOptions,
    variant,
  });
}

export function errorToObject(error: Error | AxiosError<ErrorResponse>) {
  let errors: ErrorObject = {
    errorMessage: '',
    serverMessage: '',
    fields: {},
  };
  if(axios.isAxiosError(error) && error.response) {
    const { data } = error.response as AxiosResponse<ErrorResponse>;
    errors.serverMessage = data?.message ?? 'Error';
    errors.fields = {};
    data.errors?.forEach(e => {
      errors.fields[e.param] = e.msg;
    });
  }
  errors.errorMessage = error.message;

  return errors;
}
