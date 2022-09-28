import { useEffect, useState } from 'react';
import 'axios';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { setFieldValue } from './utils';
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleIngresarClick() {
    console.log(user, password);
    navigate('/dashboard');
  }

  return (
    <div style={{
      display: 'flex',
      backgroundImage: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Card elevation={6}>
        <CardContent>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 22 }}>Ingresar</Typography>
            <TextField
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
              onClick={handleIngresarClick}
            >
              Ingresar
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
