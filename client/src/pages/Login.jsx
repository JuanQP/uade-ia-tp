import { setFieldValue } from '@/utils';
import { PasswordTextField } from '@features/Users';
import { useUserContext } from '@hooks/UserContext';
import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  useEffect(() => {
    if(state?.message) {
      setMessage(state.message);
    }
    const existingToken = localStorage.getItem('token');
    if(!existingToken) return;

    axios.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
    navigate('/home');
  }, []);

  async function handleIngresarClick(event) {
    event.preventDefault();
    if (!email || !password) {
      setMessage('Ingrese usuario y contraseña');
      return;
    }
    setMessage('');
    try {
      setWaiting(true);
      const { data } = await axios.post('/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('nombre', data.nombre);
      setUser(data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      navigate('/home');
    } catch (error) {
      const { data } = error.response;
      setMessage(data?.message);
      setErrors(data?.errors ?? []);
    } finally {
      setWaiting(false);
    }
  }

  return (
    <div style={{
      backgroundImage: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    }}>
      <Helmet>
        <meta name="theme-color" content="rgb(2, 0, 36)" />
      </Helmet>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}>
        <div style={{
          display: 'flex',
          marginBottom: 'auto',
          justifyContent: 'flex-end',
          width: '100%'
        }}>
          <Typography sx={{ fontSize: 14, color: 'white' }}>
            UADE - Integración de Aplicaciones - Grupo 4
          </Typography>
        </div>
        <Card elevation={6} sx={{marginTop: 'auto'}}>
          <CardContent>
            <Stack spacing={2}>
              <Typography sx={{ fontSize: 14 }}>
                Sistema de Administración de Contenido
              </Typography>
              <Typography sx={{ fontSize: 22 }}>
                Ingresar
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <Stack spacing={2}>
                  <TextField
                    disabled={waiting}
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
                    disabled={waiting}
                    label="Contraseña"
                    variant="outlined"
                    error={errors.find(e => e.param === 'password')}
                    helperText={errors.find(e => e.param === 'password')?.msg}
                    onChange={setFieldValue(setPassword)}
                  />
                  <LoadingButton
                    loading={waiting}
                    startIcon={<LoginIcon />}
                    size='large'
                    variant='contained'
                    type="submit"
                    onClick={handleIngresarClick}
                  >
                    Ingresar
                  </LoadingButton>
                </Stack>
              </Box>
              {message !== '' && (
                <Typography sx={{ color: 'error.main' }}>{message}</Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
        {/* Invisible box to center Card */}
        <Box sx={{marginTop: 'auto', marginBottom: 'auto'}}></Box>
      </div>
    </div>
  );
}
