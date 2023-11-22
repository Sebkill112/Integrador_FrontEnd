import React, { useEffect, useState } from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box, Button, Divider, FormControl, Grid, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, createTheme } from "@mui/material";
import NavBar from "../../layouts/appBar";
import axios from 'axios';
import http from "../../http";
import CustomLoadingButton from "../../components/Button/LoadingButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { FlexBox } from "../../components/Containers";
import ApartmentIcon from '@mui/icons-material/Apartment';
import CustomModal from "../../components/CustomModal";
import MaterialTable from "material-table";
import { ThemeProvider } from '@mui/material';
import Swal from "sweetalert2";
import ActualizacionSede from "./actualizaSedeForm";



export default function AsignarLibroSede() {

    const [sedes, setSedes] = React.useState([]);
    const [sede, setSede] = React.useState(0);
    const [libros, setLibros] = React.useState([]);
    const [libro, setLibro] = React.useState(0);
    const [cantidad, setCantidad] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);



    const limpiar = () => {
        setSede(0);
        setLibro(0);
        setCantidad('');
    }



    const onchangeLibro = (event) => {
        setLibro(event.target.value);
    }
    const onChangeSede = (event) => {
        setSede(event.target.value);
    }
    const onChangeCantidad = (event) => {
        setCantidad(event.target.value);
    }


    React.useEffect(() => {
        (async () => {
            const response = await http.get("/api/sede/listado");
            setSedes(response.data)
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const response = await http.get("/api/libro/listado");
            setLibros(response.data)
        })();
    }, []);



    const Asignar = async () => {

        if(libro === 0 || sede === 0 || cantidad === ''){
            Swal.fire({
                icon: 'warning',
                title: 'Asignar Libro',
                text: 'Ingrese el libro,sede y cantidad',
                timer: 2000
            });
        }else{
            await http.post(`/api/libroSede/actualizar-stock-y-estado?idLibro=${libro}&idSede=${sede}&nuevoStock=${parseInt(cantidad)}`)
            .then((response) => {

                Swal.fire({
                    icon: 'success',
                    title: 'Asignar Libro',
                    text: 'Registro exitoso',
                    timer: 2000
                });
                limpiar();
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Asignar Libro',
                        text: `Error: Valide con el Administrador`,
                    });
                }
            });
        }

       

    };

    return (
        <>
            <Box height={20} />
            <Box display={'flex'}>

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>


                    <Grid container spacing={2} justifyContent="left" alignItems="center">
                        <Grid item xs={12} sm={12} md={12}>
                            <Box sx={{ mt: 1, mb: 2.5, mx: 1 }}>
                                <Divider>
                                    <Typography variant="h4" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                                        Asignar Libros a Sede
                                    </Typography>
                                </Divider>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <FormControl sx={{ height: '60px' }} fullWidth>
                                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                                    <ApartmentIcon color="primary" fontSize="large" />
                                    <TextField
                                        fullWidth
                                        select
                                        size="small"
                                        name="Libro"
                                        type="text"
                                        label="Libro"
                                        value={libro}
                                        onChange={onchangeLibro}
                                    >
                                        <MenuItem value={0}>
                                            Seleccione un Libro
                                        </MenuItem>
                                        {libros.map((item) => (
                                            <MenuItem key={item.codigo} value={item.codigo}>
                                                {item.nombre}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FlexBox>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <FormControl sx={{ height: '60px' }} fullWidth>
                                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                                    <ApartmentIcon color="primary" fontSize="large" />
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="Sede"
                                        select
                                        type="text"
                                        label="Sucursal"
                                        value={sede}
                                        onChange={onChangeSede}
                                    >
                                        <MenuItem value={0}>
                                            Seleccione una Sede
                                        </MenuItem>
                                        {sedes.map((item) => (
                                            <MenuItem key={item.codigo} value={item.codigo}>
                                                {item.nombre}
                                            </MenuItem>
                                        ))}

                                    </TextField>
                                </FlexBox>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2}>
                            <FormControl sx={{ height: '60px' }} fullWidth>
                                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                                    <ApartmentIcon color="primary" fontSize="large" />
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="Cantidad"
                                        type="number"
                                        label="Ingresa una Cantidad"
                                        value={cantidad}
                                        onChange={onChangeCantidad}
                                    />
                                </FlexBox>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2}>
                            <FormControl sx={{ height: '60px' }}>
                                <CustomLoadingButton
                                    type="submit"
                                    startIcon={<AddCircleIcon sx={{ height: '15px' }} />}
                                    variant="contained"
                                    loading={isLoading}
                                    style={{
                                        marginTop: 2,
                                        backgroundColor: '#00e64d',
                                        fontWeight: 'lighter',
                                        color: 'black',
                                        fontSize: '15px',
                                        height: '28px'
                                    }} onClick={
                                        () => {setIsLoading(true); 
                                            Asignar()
                                            .finally(() => setIsLoading(false))}
                                    } >Asignar</CustomLoadingButton>
                            </FormControl >
                        </Grid>
                    </Grid>

                </Box>
            </Box>

        </>
    )
}
