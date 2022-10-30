import { Slide } from '@mui/material';

export function notification(enqueue, message = '', variant = 'info') {
  enqueue(message, {
    ...snackbarOptions,
    variant,
  });
}

export const snackbarOptions = {
  variant: 'info',
  anchorOrigin: {vertical: 'top', horizontal: 'right'},
  TransitionComponent: (props) => (<Slide {...props} direction="down" />),
};

export function errorToObject(error) {
  let errors = {};
  errors.message = error.response?.data?.message;
  errors.fields = {};
  error.response?.data?.errors?.forEach(e => {
    errors.fields[e.param] = { message: e.msg };
  });

  return errors;
}
