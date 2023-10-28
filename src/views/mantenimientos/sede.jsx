import React, { useEffect, useState } from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box, Button, Divider, FormControl, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, createTheme } from "@mui/material";
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

const stylesModal = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    pt: '10em'
  }
};  

 
export default function MantemientoSedes(){

    const defaultMaterialTheme = createTheme();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sedes, setSedes] = React.useState([]);
    const [sede, setSede] = React.useState(null);
    const [codigo, setCodigo] = React.useState([]);
    const [nombre, setNombre] = React.useState('');
    const [direccion, setDireccion] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [contactoSede, setContactoSede] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [actualiza,setActualiza] = React.useState(false);
  

    
    const agregarLibro=(data)=>{
      console.log(data);
    }

    const onchangeCodigo = (event) =>{
        setCodigo(event.target.value);
    }
    const onchangeNombre = (event) =>{
        setNombre(event.target.value);
    }
    const onchangeDireccion = (event) =>{
        setDireccion(event.target.value);
    }
    const onchangeTelefono = (event) =>{
        setTelefono(event.target.value);
    }
    const onchangeContactoSede = (event) =>{
      setContactoSede(event.target.value);
  }
    const onchangeEstado = (event) =>{
        setEstado(event.target.value);
    }

    const handleOpenActualiza = (data) =>{
      setSede(data)
      setActualiza(true);
    }

    const handleCloseActualiza = () =>{
      setActualiza(false);
    }

    React.useEffect(() => {
        (async () => {
          const response = await http.get("/api/sede/listado");
          setSedes(response.data)  
        })();
      }, []);

      const handleCloseModalActualiza = async (boleean) => {
        setActualiza(boleean);
        const response = await http.get("/api/sede/listado");
                setSedes(response.data); 
    };

      const limpiarInput = () => {
        setNombre('');
        setDireccion('');
        setTelefono('');
        setContactoSede('');
    };

    const listadoRefrescar = async () => {
      const response = await http.get("/api/sede/listado");
          setSedes(response.data)  
  };

      const RegistrarSede = async () =>{

        const data = {
          
        nombre: nombre,
        direccion: direccion,
    telefono: telefono,
    contactoSede:contactoSede,
    //estado: 1
        }

        console.log(data)

        await http.post('/api/sede/registrar', data)
        .then((response) => {
          
            Swal.fire({
              icon: 'success',
              title: 'Registro de Sede',
              text: 'Registro exitoso',
              timer: 2000
            });
            limpiarInput()
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Registro de Sede',
              text: `Error: ${error.response.data}`,
            });
          }
        });
        listadoRefrescar()
      };

  const eliminaSede = (data) =>{
    Swal.fire({
      title: `¿Desea eliminar la sede ${data.nombre}? `,
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then(async (result) => {
          if (result.isConfirmed) {
            await http.delete(`/api/sede/elimina/${data.codigo}`)
            .then((response) => {

                Swal.fire({
                    icon: 'success',
                    title: 'Eliminar Sede',
                    text: `${response.data.mensaje}`,
                    timer: 2000
                });
                listadoRefrescar();
            })
            .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Eliminacion de Sede',
                        text: `No se pudo eliminar el sede, valide con el administrador`,
                    });
            });
          }
    })   
  };
    
  const columnas = [
    {
      title: 'Codigo',
      field: 'codigo'
    },
    {
      title: 'Nombre',
      field: 'nombre'
    },
    {
      title: 'Direccion',
      field: 'direccion'
    },
    {
      title: 'Telefono',
      field: 'telefono'
    },
    {
      title: 'Contacto Sede',
      field: 'contactoSede'
    }
  ];

    return (
        <>
        <NavBar/>
        <Box height={50}/>
        <Box display={'flex'}>
        <Sidenavs />
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
        
        
        <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12}>
              <Box sx={{ mt: 1, mb: 2.5, mx: 1 }}>
                <Divider>
                  <Typography variant="h4" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                    Registrar Sede
                  </Typography>
                </Divider>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={2.5}>
              <FormControl sx={{ height: '60px' }} fullWidth>
                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                  <ApartmentIcon color="primary" fontSize="large" />
                  <TextField
                    fullWidth
                    size="small"
                    name="Nombre"
                    type="text"
                    label="Ingresa Nombre"
                    value={nombre}
                    onChange={onchangeNombre}
                  />
                </FlexBox>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2.5}>
              <FormControl sx={{ height: '60px' }} fullWidth>
                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                  <ApartmentIcon color="primary" fontSize="large" />
                  <TextField
                    fullWidth
                    size="small"
                    name="Direccion"
                    type="text"
                    label="Ingresa Direccion"
                    value={direccion}
                    onChange={onchangeDireccion}
                  />
                </FlexBox>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2.5}>
              <FormControl sx={{ height: '60px' }} fullWidth>
                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                  <ApartmentIcon color="primary" fontSize="large" />
                  <TextField
                    fullWidth
                    size="small"
                    name="Telefono"
                    type="text"
                    label="Ingresa Telefono"
                    value={telefono}
                    onChange={onchangeTelefono}
                  />
                </FlexBox>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2.5}>
              <FormControl sx={{ height: '60px' }} fullWidth>
                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                  <ApartmentIcon color="primary" fontSize="large" />
                  <TextField
                    fullWidth
                    size="small"
                    name="Contacto Sede"
                    type="text"
                    label="Contacto Sede"
                    value={contactoSede}
                    onChange={onchangeContactoSede}
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
                  style={{
                    marginTop: 2,
                    backgroundColor: '#adff33',
                    fontWeight: 'lighter',
                    color: 'black',
                    fontSize: '15px',
                    height: '28px'
                  }} onClick={RegistrarSede} >Agregar</CustomLoadingButton>
              </FormControl >
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
            <div style={{ width: '100%', height: '100%' }}>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
            <ThemeProvider theme={defaultMaterialTheme}>
           <MaterialTable
           columns={columnas}
           data={sedes}
           title="Libros de la Sede"
           actions={[
            {icon: 'edit',
            tooltip: 'Actualiza Sede',
            onClick:(event,rowData)=> handleOpenActualiza(rowData)
          },
          {icon: 'delete',
            tooltip: 'Eliminar Sede',
            onClick:(event,rowData)=> eliminaSede(rowData)
          },
            
           ]}
           options={
            {
              actionsColumnIndex: -1
            }
           }
           localization={{
            header:{
              actions: ''
            },
            pagination: {
              firstAriaLabel: 'Primera página',
              firstTooltip: 'Primera página',
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsPerPage: 'Filas por página:',
              labelRowsSelect: 'filas',
              lastAriaLabel: 'Ultima página',
              lastTooltip: 'Ultima página',
              nextAriaLabel: 'Pagina siguiente',
              nextTooltip: 'Pagina siguiente',
              previousAriaLabel: 'Pagina anterior',
              previousTooltip: 'Pagina anterior',
            },
            toolbar: {
              searchPlaceholder: 'Buscar Sede'
            },
            body:{ emptyDataSourceMessage:
            <h1 style={{ textAlign:'center'}}>No hay libros en la sede</h1> }
           }}
           
           
           />
            </ThemeProvider>
            </div>
            </Grid>
            </Grid>
           
        </Box>
        </Box>

        <CustomModal open={actualiza} handleClose={handleCloseActualiza} title="Actualizacion de Sede" styles={stylesModal}>
        <div
          style={{
            // minWidth: 'calc(80vw)',
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
            margin: '0 auto'
          }}
        >
          <Grid container spacing={2} justifyContent="center" alignItems="center">

            <Grid item xs={12} sm={12} md={12}>


              <ActualizacionSede cerrarModal={handleCloseModalActualiza} dataSede={sede}/>
            </Grid>

          </Grid>
        </div>
        
      </CustomModal>
        </>
    )
}
