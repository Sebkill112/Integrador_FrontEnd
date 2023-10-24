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
  
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };


export default function MantemientoSedes(){

    const defaultMaterialTheme = createTheme();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sedes, setSedes] = React.useState([]);
    const [codigo, setCodigo] = React.useState([]);
    const [nombre, setNombre] = React.useState('');
    const [direccion, setDireccion] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [contactosede, setContactoSede] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [operacion, SetOperacion]= useState(1);
    const [arrDetalle, setArrDetalle] = React.useState([]);
    const [detalle, setDetalle] = React.useState(false);
  

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

    React.useEffect(() => {
        (async () => {
          const response = await http.get("/api/sede/listado");
          setSedes(response.data)  
        })();
      }, []);
     /* React.useEffect(() => {
        (async () => {
          const response = await http.get("/api/sede/registrar");
          setSedes(response.data)
    
        })();
      }, []);
      React.useEffect(() => {
        (async () => {
          const response = await http.put("/api/sede/actualizar");
          setSedes(response.data) 
        })();
      }, []);*/

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
    contactoSede:contactosede,
    estado: 1
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

const handleOpenDetalle = () => {
    setDetalle(true);

  };
  const handleCloseDetalle = () => {
    setDetalle(false);
  };
  const dataDetalle = (arrDocumentos) => {
    setArrDetalle(arrDocumentos);
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
          title: 'Contacto Sede',
          field: 'contactoSede'
        },
        {
          title: 'Estado',
          field: 'estado'
        }
      ];

    return (
        <>
        <NavBar/>
        <Box height={30}/>
        <Box display={'flex'}>
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Sidenavs />
        
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
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
            <Grid item xs={12} sm={12} md={6}>
              <FormControl sx={{ height: '60px' }}>
                 <CustomLoadingButton
                  type="submit"
                  startIcon={<AddCircleIcon sx={{ height: '15px' }} />}
                  variant="contained"
                  style={{
                    marginTop: 2,
                    backgroundColor: '#ffce73',
                    fontWeight: 'lighter',
                    color: 'black',
                    fontSize: '15px',
                    height: '28px'
                  }} onClick={RegistrarSede} >Agregar</CustomLoadingButton>
              </FormControl >
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormControl sx={{ height: '60px' }} fullWidth>
                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                  <ApartmentIcon color="primary" fontSize="large" />
                  <TextField
                    fullWidth
                    size="small"
                    name="codigo"
                    type="text"
                    label="Ingresa Nombre"
                    value={nombre}
                    onChange={onchangeNombre}
                  />
                </FlexBox>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormControl sx={{ height: '60px' }} fullWidth>
                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                  <ApartmentIcon color="primary" fontSize="large" />
                  <TextField
                    fullWidth
                    size="small"
                    name="codigo"
                    type="text"
                    label="Ingresa Direccion"
                    value={direccion}
                    onChange={onchangeDireccion}
                  />
                </FlexBox>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormControl sx={{ height: '60px' }} fullWidth>
                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                  <ApartmentIcon color="primary" fontSize="large" />
                  <TextField
                    fullWidth
                    size="small"
                    name="codigo"
                    type="text"
                    label="Ingresa Telefono"
                    value={telefono}
                    onChange={onchangeTelefono}
                  />
                </FlexBox>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormControl sx={{ height: '60px' }} fullWidth>
                <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                  <ApartmentIcon color="primary" fontSize="large" />
                  <TextField
                    fullWidth
                    size="small"
                    name="codigo"
                    type="text"
                    label="Ingresa Direccion"
                    value={contactosede}
                    onChange={onchangeContactoSede}
                  />
                </FlexBox>
              </FormControl>
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
            {icon: 'add',
            tooltip: 'Agregar Libro',
            onClick:(event,rowData)=> agregarLibro(rowData)
          }
            
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
              searchPlaceholder: 'Buscar Libro'
            },
            body:{ emptyDataSourceMessage:
            <h1 style={{ textAlign:'center'}}>No hay libros en la sede</h1> }
           }}
           
           
           />
            </ThemeProvider>
            </div>
            </Grid>
            </Grid>
           
        </div>
        </Box>
        </Box>



        <CustomModal open={detalle} handleClose={handleCloseDetalle} title="Detalle Sede" styles={stylesModal}>
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
            </Grid>

          </Grid>
        </div>
        
      </CustomModal>
        </>
    )
}
