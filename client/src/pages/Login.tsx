import { errorToObject } from '@/utils';
import { LoginForm, userAPI } from '@features/Users';
import { useUserContext } from '@hooks/UserContext';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockIcon from '@mui/icons-material/Lock';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from "react-router-dom";

const styles = {
  backgroundDiv: {
    backgroundImage: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
  },
  containerDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  firstRowDiv: {
    display: 'flex',
    marginBottom: 'auto',
    justifyContent: 'flex-end',
    width: '100%'
  },
  bottomBox: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  upperCardContent: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: 1,
  },
  bottomCardContent: {
    backgroundColor: 'common.white',
    borderRadius: '0px 0px 0px 0px',
  },
  loginIcon: {
    fontSize: '48px',
    color: 'common.white',
  },
}

export function Login() {

  const [waiting, setWaiting] = useState(false);
  const [loginOk, setLoginOk] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const hasErrors = message !== '' || Object.keys(errors).length !== 0;

  const LoginIcon = waiting ? MoreHorizIcon
    : hasErrors ? LockIcon
      : loginOk ? HowToRegIcon
        : PersonIcon;
  const cardBackgroundColor = waiting ? 'grey.700'
    : loginOk ? 'background.loginOk'
      : hasErrors ? 'error.main'
        : 'primary.main';

  useEffect(() => {
    const awaitVerifyToken = async () => {
      try {
        await userAPI.verifyToken();
        navigate('/home');
      } catch (error) {
        // Stays in this page for logging in
      }
    }
    if(state?.message) {
      setMessage(state.message);
    }
    awaitVerifyToken();
  }, []);

  async function handleIngresar({ email, password }: { email: string, password: string}) {
    setMessage('');
    setErrors([]);
    try {
      setWaiting(true);
      const data = await userAPI.login(email, password);
      setUser(data);
      setLoginOk(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      if(error instanceof Error) {
        const errors = errorToObject(error);
        setMessage(errors.serverMessage !== '' ? errors.serverMessage : errors.errorMessage);
        setErrors(errors.fields);
      }
    } finally {
      setWaiting(false);
    }
  }

  return (
    <Box style={styles.backgroundDiv}>
      <Helmet>
        <meta name="theme-color" content="rgb(2, 0, 36)" />
      </Helmet>
      <Box sx={styles.containerDiv}>
        <Box style={styles.firstRowDiv}>
          <Typography sx={{ fontSize: 14, color: 'common.white' }}>
            UADE - Integración de Aplicaciones - Grupo 4
          </Typography>
        </Box>
        <Card raised sx={{
          marginTop: 'auto',
          transition: 'background-color 0.5s ease',
          backgroundColor: cardBackgroundColor,
        }}>
          <CardContent sx={styles.upperCardContent}>
            <LoginIcon sx={styles.loginIcon}/>
          </CardContent>
          <CardContent sx={styles.bottomCardContent}>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={300}>
                Ingresar
              </Typography>
              <LoginForm
                loading={waiting}
                disabled={waiting || loginOk}
                errors={errors}
                onSubmit={handleIngresar}
              />
              {message !== '' && (
                <Typography sx={{ color: 'error.main' }}>
                  {message}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
        {/* Invisible box to center Card */}
        <Box sx={styles.bottomBox}></Box>
      </Box>
    </Box>
  );
}
