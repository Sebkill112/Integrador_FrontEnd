import { Avatar, Box, Button, CssBaseline, Grid, Link, Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { FlexBox } from '../../components/Containers';
import CustomLoadingButton from '../../components/Button/LoadingButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const defaultTheme = createTheme();

  const navigate = useNavigate();

  const onchangeUser = (event) => {
    setUsername(event.target.value);
  }
  const onchangePass = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8090/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        
        const data = await response.json(); 
        localStorage.setItem('user', JSON.stringify(data));
        console.log('local', JSON.parse(localStorage.getItem('user')));
        const expirationDate = new Date();
        if (!isNaN(expirationDate)) { 
          expirationDate.setMinutes(expirationDate.getMinutes() + 30);
        } else {
          console.log('La fecha es inválida.');
        }      

        const cookieExpiration = `expires=${expirationDate.toUTCString()}`;

        document.cookie = `jwtToken=${data.token}; path=/; ${cookieExpiration};`;

        navigate('/index');
        // Mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Has iniciado sesión correctamente.',
        });
      } else {
        // Maneja errores de autenticación
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToHome = () => {
    navigate('/');
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9uZG8lMjBkZSUyMGxhJTIwYmlibGlvdGVjYXxlbnwwfHwwfHx8MA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
         { /*<CustomLoadingButton
            type="submit"
            startIcon={<AddCircleIcon sx={{ height: '15px' }} />}
            variant="contained"
            style={{
              margin: 'auto',
              marginTop: '20px',
              backgroundColor: '#fff',
              fontWeight: 'lighter',
              color: '#000',
              fontSize: '15px',
              height: '28px'
            }}
            onClick={handleToHome}
          >
            Ir a Home
          </CustomLoadingButton>*/} 
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingreso
            </Typography>

            <form >
              <Box sx={{ mt: 1 }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={12} md={10}>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">

                      <AccountCircleIcon color="primary" fontSize="large" />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={username}
                        label="Usuario"
                        name="username"
                        onChange={onchangeUser}
                      />
                    </FlexBox>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>

                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">

                      <PasswordIcon color="primary" fontSize="large" />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={onchangePass}
                      />
                    </FlexBox>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      onClick={handleLogin}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Ingresar
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    <Link href="/registro" variant="body2">
                      {"No tienes una cuenta? Registrate aquí"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;