import React from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box, Divider, FormControl, Grid, MenuItem, TableHead, TextField, Typography } from "@mui/material";
import NavBar from "../../layouts/appBar";
import http from "../../http";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { FlexBox } from "../../components/Containers";
import CustomLoadingButton from '../../components/Button/LoadingButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomModal from '../../components/CustomModal/index';
import Swal from 'sweetalert2';
import MaterialTable from "material-table";
import dayjs from "dayjs";
import RegistroLibro from "./registroLibroForm";
import ActualizacionLibro from "./actualizaLibroForm";

const stylesModal = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#009933"

  },
  box: {
    display: 'flex',
    alignItems: 'center',
    pt: '10em',
    backgroundColor: "#009933"
  }
};

const stylesModal2 = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#29a3a3"

  },
  box: {
    display: 'flex',
    alignItems: 'center',
    pt: '10em',
    backgroundColor: "#29a3a3"
  }
};

export default function MantemientoClientes(){
  
  
    const [libros,setLibros] = React.useState([]);
    const [registro,setRegistro] = React.useState(false);
    const [actualiza,setActualiza] = React.useState(false);
    const [libro,setLibro] = React.useState(null);

    const defaultMaterialTheme = createTheme();


    React.useEffect(() => {
        (async () => {
          const response = await http.get("/api/libro/listado");
          setLibros(response.data)  
        })();
      }, []);

      const columnas = [

        {
          title: 'Codigo',
          field: 'codigo'
        },
        {
          title: 'Titulo',
          field: 'nombre'
        },
        {
          title: 'Autor',
          field: 'autor'
        },
        {
          title: 'Editorial',
          field: 'editorial.nombre'
        },
        {
          title: 'Genero',
          field: 'genero.nombre'
        },
        {
          title: 'Edicion',
          field: 'edicion'
        }
    
      ];

      const handleOpenRegistro = () =>{
        setRegistro(true);
        
      }

      const handleCloseRegistro = () =>{
        setRegistro(false);
      }

      const handleCloseModalRetiro = async (boleean) => {
        setRegistro(boleean);
        const response = await http.get(`/api/libro/listado`);
                setLibros(response.data);
          
    };

    const handleOpenActualiza = (data) =>{
      setLibro(data)
      setActualiza(true);
    }

    const handleCloseActualiza = () =>{
      setActualiza(false);
    }

    const handleCloseModalActualiza = async (boleean) => {
      setActualiza(boleean);
      const response = await http.get(`/api/libro/listado`);
              setLibros(response.data);
        
  };

  const listadoRefrescar = async () => {
    const response = await http.get("/api/libro/listado");
        setLibros(response.data)  
};


      const eliminaLibro = (data) =>{
        Swal.fire({
          title: `¿Desea eliminar el libro ${data.nombre}? `,
          text: "Los cambios no se van a revertir",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'No, cancelar'
        }).then(async (result) => {
              if (result.isConfirmed) {
                await http.delete(`/api/libro/elimina/${data.codigo}`)
                .then((response) => {
    
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminar Libro',
                        text: `${response.data.mensaje}`,
                        timer: 2000
                    });
                    listadoRefrescar();
                })
                .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Eliminacion de Libro',
                            text: `No se pudo eliminar el libro, valide con el administrador`,
                        });
                });
              }
        })   
      };

    return (
        <>
        <NavBar/>
        <Box height={50}/>
         <Box display={'flex'}>
        <Sidenavs />
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Grid container spacing={2} justifyContent="left" alignItems="center">
        <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ mt: 1, mb: 2.5, mx: 1 }}>
                <Divider>
                  <Typography variant="h4" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                   Mantenimiento de Libros
                  </Typography>
                </Divider>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
            <FormControl sx={{ height: '60px' }}>
                        <CustomLoadingButton
                            type="submit"
                            startIcon={<AddCircleIcon sx={{ height: '15px' }} />}
                            variant="contained"
                            style={{
                                marginTop: 2,
                                backgroundColor: '#00e64d',
                                fontWeight: 'lighter',
                                color: 'black',
                                fontSize: '15px',
                                height: '28px'
                            }}
                            onClick={handleOpenRegistro}

                        >
                            Registrar
                        </CustomLoadingButton>
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
           data={libros}
           title="Libros"
           actions={[
            {icon: 'edit',
            tooltip: 'Actualiza Libro',
            onClick:(event,rowData)=> handleOpenActualiza(rowData)
          },
          {icon: 'delete',
            tooltip: 'Eliminar Libro',
            onClick:(event,rowData)=> eliminaLibro(rowData)
          },
            
           ]}
           options={
            {
              actionsColumnIndex: -1,
              exportButton: true
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
        </Box>
        
        </Box>

        <CustomModal open={registro} handleClose={handleCloseRegistro} title="Registro de Libro" styles={stylesModal}>
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

              <RegistroLibro cerrarModal={handleCloseModalRetiro}/>
            </Grid>

          </Grid>
        </div>
      </CustomModal>

      <CustomModal open={actualiza} handleClose={handleCloseActualiza} title="Actualizacion de Libro" styles={stylesModal2}>
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

              <ActualizacionLibro cerrarModal={handleCloseModalActualiza} dataLibro={libro}/>
            </Grid>

          </Grid>
        </div>
      </CustomModal>
        </>
    )
}