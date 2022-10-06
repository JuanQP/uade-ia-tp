import { Slide } from '@mui/material';
import axios from 'axios';

/**
 * Returns a function that expects an HTMLInput element in order to set that value
 * @param {*} setter The "setValue" of a useState
 * @returns
 */
export function setFieldValue(setter) {
  return (element) => setter(element.target?.value ?? element);
}

export async function checkToken(navigate) {
  try {
    return await axios.get('/api/verify');
  } catch (error) {
    navigate('/logout', {
      state: { message: error.response?.data?.message ?? error.message },
    });
  }
}

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
