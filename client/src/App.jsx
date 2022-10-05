import { useEffect, useState } from 'react';
import 'axios';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { setFieldValue } from './utils';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/system';

function App() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const existingToken = localStorage.getItem('token');
    if(!existingToken) return;
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
    navigate('/dashboard');
  }, []);

  async function handleIngresarClick(event) {
    event.preventDefault();
    try {
      setWaiting(true);
      const { data } = await axios.post('/api/login', {
        email: user,
        password,
      });
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setWaiting(false);
    }
  }

  return (
    <div style={{
      backgroundImage: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div style={{
          display: 'flex',
          marginBottom: 'auto',
          justifyContent: 'flex-end',
          width: '100%'
        }}>
          <Typography sx={{ fontSize: 14, color: 'white' }}>
            UADE - Integración de Aplicaciones - Grupo 1
          </Typography>
        </div>
        <Card elevation={6} sx={{marginTop: 'auto'}}>
          <CardContent>
            <Stack spacing={2}>
              <Typography sx={{ fontSize: 14 }}>Sistema de Administración de Contenido</Typography>
              <Typography sx={{ fontSize: 22 }}>Ingresar</Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <Stack spacing={2}>
                  <TextField
                    autoFocus
                    label="Usuario"
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">@uade.edu.ar</InputAdornment>,
                    }}
                    onChange={setFieldValue(setUser)}
                  />
                  <TextField
                    label="Contraseña"
                    variant="outlined"
                    type="password"
                    onChange={setFieldValue(setPassword)}
                  />
                  <Button
                    size='large'
                    variant='contained'
                    disabled={waiting}
                    type="submit"
                    onClick={handleIngresarClick}
                  >
                    Ingresar
                  </Button>
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

export default App;
