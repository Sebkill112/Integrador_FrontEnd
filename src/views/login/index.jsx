import { Avatar, Box, Button, CssBaseline, Grid, Link, Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const defaultTheme = createTheme();

  const navigate = useNavigate();

  const onchangeUser = (event) =>{
    setUsername(event.target.value);
  }
  const onchangePass = (event) =>{
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
        // Si la autenticación es exitosa, el servidor debería haber configurado una cookie con el token JWT
        const data = await response.json(); // Lee el contenido JSON de la respuesta
      console.log(data);

      localStorage.setItem('user', JSON.stringify(data));
      console.log('local',JSON.parse(localStorage.getItem('user')));
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getTime() + 30 * 60 * 1000);

      const cookieExpiration = `expires=${expirationDate.toUTCString()}`;

      document.cookie = `jwtToken=${data.token}; path=/; ${cookieExpiration}; secure`;

      navigate('/libros');
      navigate('/homepage');

      } else {
        // Maneja errores de autenticación
        console.error('Error de inicio de sesión');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={username}
                label="Usuario"
                name="username"
                onChange={onchangeUser}
              />
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
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleLogin}
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/registro" variant="body2">
                    {"No tienes una cuenta? Registrate aquí"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;