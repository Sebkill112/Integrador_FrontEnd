import { Avatar, Box, Button, CssBaseline, FormControl, Grid, Link, Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { FlexBox } from '../../components/Containers';
import ApartmentIcon from '@mui/icons-material/Apartment';
import http from '../../http';
import Swal from 'sweetalert2';
import CustomLoadingButton from '../../components/Button/LoadingButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';

import { FormControlLabel } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';




const Registro = () => {
  const theme = useTheme();

    const [username, setUsername] = useState('');
    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');


    const [password, setPassword] = useState('');

    const defaultTheme = createTheme();

    const navigate = useNavigate();

    const onchangeDni = (event) =>{
      setDni(event.target.value);
  }
    const onchangeNombre = (event) =>{
      setNombre(event.target.value);
  }
    const onchangeApellido = (event) =>{
      setApellido(event.target.value);
  }
    const onchangeDireccion = (event) =>{
      setDireccion(event.target.value);
  }

    const onchangeCorreo = (event) =>{
      setCorreo(event.target.value);
  }

    const onchangeUser = (event) =>{
        setUsername(event.target.value);
    }

    const onchangePass = (event) =>{
        setPassword(event.target.value);
    }
    const limpiarInput = () => {
      setPassword('');
      setUsername('');
      setCorreo('');
      setDireccion('');
      setApellido('');
      setNombre('');
      setDni('');
  };

        const registrarRegistro = async () =>{



        const data = {
          
          dni: dni,
          nombre: nombre,
          apellido: apellido ,
          direccion: direccion ,
          correo: correo,
          username: username,
          password: password,
          rol: 2
        }

        console.log(data)

        await axios.post('http://localhost:8090/auth/register', data)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Registro de Usuario',
              text: 'Registro exitoso',
              timer: 2000
            });
            limpiarInput()
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Registro de Usuario',
              text: `Error: ${error.response.data}`,
            });
          }
        });

          // console.log('Response:', response.data);

          // if (response.status === 200) {
          //   // Request was successful, show a success message
          //   console.log('Response:', response.data);
          //   Swal.fire({
          //     icon: 'success',
          //     title: 'Registro de Usuario',
          //     text: 'Registro exitoso',
          //     timer: 2000
          //   });
          // } else {
          //   // Request had a 400 status, show an error message
          //   console.error('Request failed with status:', response.status);
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'Registro de Usuario',
          //     text:  `Error:${response.data}`,
          //   });
          // }
        
        

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
                <Grid container spacing={2} justifyContent="center">

                <Grid item xs={12} sm={12} md={10}>
              <FormControl sx={{ height: '60px' }} fullWidth>
                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                  <ApartmentIcon color="primary" fontSize="large" />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={dni}
                  label="DNI"
                  type="number"
                  name="username"
                  onChange={onchangeDni}
                />
                 </FlexBox>

            </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  <FormControl sx={{ height: '60px' }} fullWidth>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                      <ApartmentIcon color="primary" fontSize="large" />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={nombre}
                      label="Nombre"
                      name="username"
                      onChange={onchangeNombre}
                    />
                    </FlexBox>

                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  <FormControl sx={{ height: '60px' }} fullWidth>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                      <ApartmentIcon color="primary" fontSize="large" />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={apellido}
                      label="Apellido"
                      name="username"
                      onChange={onchangeApellido}
                    />
                    </FlexBox>

                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  <FormControl sx={{ height: '60px' }} fullWidth>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                      <ApartmentIcon color="primary" fontSize="large" />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={direccion}
                      label="Direccion"
                      name="username"
                      onChange={onchangeDireccion}
                    />
                    </FlexBox>

                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  <FormControl sx={{ height: '60px' }} fullWidth>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                      <ApartmentIcon color="primary" fontSize="large" />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={correo}
                      label="Correo"
                      type="email"
                      name="username"
                      onChange={onchangeCorreo}
                    />
                    </FlexBox>

                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                <FormControl sx={{ height: '60px' }} fullWidth>
                  <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                    <ApartmentIcon color="primary" fontSize="large" />
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

                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  <FormControl sx={{ height: '60px' }} fullWidth>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                      <ApartmentIcon color="primary" fontSize="large" />
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

                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                <FormControl sx={{ height: '60px' }} fullWidth>
                <CustomLoadingButton
                  type="submit"
                  startIcon={<AddCircleIcon sx={{ height: '15px' }} />}
                  variant="contained"
                  style={{
                    marginTop: "25px",
                    backgroundColor: '#ffce73',
                    fontWeight: 'lighter',
                    color: 'black',
                    fontSize: '15px',
                    height: '28px'
                  }}
                  onClick={registrarRegistro}
                  
                >
                  Registrar 
                </CustomLoadingButton>
              </FormControl>
                </Grid>

                
                </Grid>
                <Grid container>
                  <Grid item>
                    <Link href="/" variant="body2">
                      {"Volver al login"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
      </ThemeProvider>
    
  
  );
}

    

export default Registro;