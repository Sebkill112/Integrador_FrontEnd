import React from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box, Grid } from "@mui/material";
import NavBar from "../../layouts/appBar";
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from "material-table";
import http from "../../http";

export default function Devoluciones(){
    const defaultMaterialTheme = createTheme();
    const [prestamos, setPrestamos] = React.useState([]);


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

      const devolverPrestamo  =(data) =>{

        console.log(data);
      }

    return (
        <>
        <NavBar/>
        <Box height={30}/>
         <Box display={'flex'}>
        <Sidenavs />
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
       <Grid container spacing={2} justifyContent="center" alignItems="center">

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
            onClick:(event,rowData)=> devolverPrestamo(rowData)
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
        </>
    )
}