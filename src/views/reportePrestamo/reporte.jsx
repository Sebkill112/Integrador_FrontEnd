import React from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box, Divider, Grid, Typography } from "@mui/material";
import NavBar from "../../layouts/appBar";
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from "material-table";
import http from "../../http";
import { jsPDF } from 'jspdf';
import * as autoTable from 'jspdf-autotable'


export default function Reporte() {
    const defaultMaterialTheme = createTheme();
    const [prestamos, setPrestamos] = React.useState([]);


    React.useEffect(() => {
        (async () => {
            const response = await http.get("/api/prestamo/listado");
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


    const generatePdf = (data) => {
        // Crear un nuevo documento PDF
        const pdf = new jsPDF();

        pdf.rect(5, 5, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height - 10);

        pdf.setFont("helvetica");

        pdf.setFontSize(20);
        pdf.setTextColor(255, 0, 0); // Rojo

        // Add your logo (adjust the parameters accordingly)
        const logoWidth = 30;
        const logoHeight = 15;
        pdf.addImage('https://files.logoscdn.com/v1/assets/13817708/optimized', 'PNG', 170, 10, logoWidth, logoHeight);

        const title = 'Información del Préstamo';
        const titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
        const xOffset = (pdf.internal.pageSize.width - titleWidth) / 2;
        pdf.text(title, xOffset, 20);

        // Restaurar el tipo de letra y tamaño para el contenido
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0); // Negro



        // Agregar contenido al PDF
        pdf.text(`Número del Prestamo: ${data.num_prestamo}`, 15, 30)
        pdf.text(`Sede del Prestamo: ${data.sede.nombre}`, 15, 40)
        pdf.text(`Usuario: ${data.usuario.nombre}`, 15, 50)
        pdf.text(`Fecha de Registro: ${data.fechaCreacion}`, 15, 60)
        pdf.text(`Fecha Maxima de Recojo: ${data.fechaSalida}`, 15, 70)
        pdf.text(`Fecha Maxima de Devolución : ${data.fechaDevolucion}`, 15, 80)
        pdf.text(`Estado : ${data.estado}`, 15, 90)
        pdf.text('Observaciones:', 15, 100);
        pdf.setTextColor(0, 0, 255); // Blue
        // Adjust the position for text inside the rectangle
        pdf.text(data.observaciones, 15, 105);
        pdf.setTextColor(0, 0, 0); // Negro

        const titleD = 'Detalle del Préstamo';
        const titleWidthD = pdf.getStringUnitWidth(titleD) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
        const xOffsetD = (pdf.internal.pageSize.width - titleWidthD) / 2;
        pdf.text(titleD, xOffsetD, 120);


        const headers = ['Código', 'Libro', 'Editorial', 'Genero', 'Autor'];

        const detalle = data.detallePrestamo.map(item => [item.libro.codigo, item.libro.nombre, item.libro.editorial.nombre, item.libro.genero.nombre, item.libro.autor]);

        pdf.autoTable({
            head: [headers],
            body: detalle,
            startY: 130
        });
        // Generar un Blob a partir del contenido del PDF
        const blob = pdf.output('blob');

        // Crear una URL para el Blob
        const blobUrl = URL.createObjectURL(blob);

        // Abrir una nueva ventana o pestaña con el Blob
        window.open(blobUrl, '_blank');
    };



    return (
        <>
            <NavBar />
            <Box height={30} />
            <Box display={'flex'}>
                <Sidenavs />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={12}>
                            <Box sx={{ mt: 2, mb: 2.5, mx: 1 }}>
                                <Divider>
                                    <Typography variant="h4" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                                        Reporte de Prestamos
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
                                        title="Prestamos"
                                        actions={[
                                            {
                                                icon: 'save',
                                                tooltip: 'Generar Reporte',
                                                onClick: (event, rowData) => generatePdf(rowData)
                                            }

                                        ]}
                                        options={
                                            {
                                                actionsColumnIndex: -1,
                                                exportButton: true
                                            }
                                        }
                                        localization={{
                                            header: {
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
                                            body: {
                                                emptyDataSourceMessage:
                                                    <h1 style={{ textAlign: 'center' }}>No hay prestamos </h1>
                                            }
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