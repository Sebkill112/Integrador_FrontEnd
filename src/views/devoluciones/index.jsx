import React from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box, Divider, Grid, Typography } from "@mui/material";
import NavBar from "../../layouts/appBar";
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from "material-table";
import http from "../../http";
import FullScreenDialog from "../../components/Modal";
import DetalleDevolucion from "./detalleDevolucion";
import MainCard from "../../ui-component/cards/MainCard";

export default function Devoluciones(){
    const defaultMaterialTheme = createTheme();
    const [prestamos, setPrestamos] = React.useState([]);
    const [detalle, setDetalle] = React.useState(false);
    const [prestamo, setPrestamo] = React.useState(null);


    React.useEffect(() => {
        (async () => {
          const response = await http.get("/api/prestamo/listarPorEstado/Retirado");
          setPrestamos(response.data)
    
        })();
      }, []);


    const columnas = [

        {
          title: 'Codigo',
          field: 'codigo'
        },
        {
          title: 'Numero Prestamo',
          field: 'num_prestamo'
        },
        {
          title: 'Fecha de Retiro',
          field: 'fechaSalida'
        },
        {
          title: 'Fecha de Devolucion',
          field: 'fechaDevolucion'
        },
        {
          title: 'Sede',
          field: 'sede.nombre'
        },
        {
          title: 'Observacion',
          field: 'observaciones'
        }
    
      ];

      const handleOpenDetallePrestamo = (data) => {
        setPrestamo(data);
        setDetalle(true);
  
    };


    const handleCloseDetallePrestamo = () => {
        setDetalle(false);
    };

    const handleCloseModalDevolucion = async (boleean) => {
      setDetalle(boleean);
      const response = await http.get(`/api/prestamo/listarPorEstado/Retirado`);
              setPrestamos(response.data);
        
  };

  

    return (
        <>
        <NavBar/>
        <Box height={30}/>
         <Box display={'flex'}>
        <Sidenavs />
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
       <Grid container spacing={2} justifyContent="center" alignItems="center">
       <Grid item xs={12} sm={12} md={12}>
              <Box sx={{ mt: 2.5, mb: 2.5, mx: 1 }}>
                <Divider>
                  <Typography variant="h4" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                    DEVOLUCIÓN
                  </Typography>
                </Divider>
              </Box>
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
           data={prestamos}
           title="Prestamos Retirados"
           actions={[
            {icon: 'save',
            tooltip: 'Agregar Libro',
            onClick:(event,rowData)=> handleOpenDetallePrestamo(rowData)
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
              searchPlaceholder: 'Buscar Prestamo'
            },
            body:{ emptyDataSourceMessage:
            <h1 style={{ textAlign:'center'}}>No hay prestamos retirados</h1> }
           }}
           
           
           />
            </ThemeProvider>
            </div>
            </Grid>
       </Grid>
        </Box>
        
        </Box>

        <FullScreenDialog open={detalle} handleClose={handleCloseDetallePrestamo} title="Devolver Prestamo">
                <div
                    style={{
                        minWidth: 'calc(80vw)',
                        display: 'flex',
                        width: '90%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem 0',
                        margin: '0 auto'
                    }}
                >
                    <MainCard>
                       <DetalleDevolucion dataPrestamo={prestamo} cerrarModal={handleCloseModalDevolucion}/>
                    </MainCard>
                </div>
            </FullScreenDialog>
        </>
    )
}