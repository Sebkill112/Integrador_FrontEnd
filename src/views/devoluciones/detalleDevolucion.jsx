import React from "react";
import { Box, Divider, FormControl, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import http from "../../http";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import LoupeIcon from '@mui/icons-material/Loupe';
import { FlexBox } from "../../components/Containers";
import CustomLoadingButton from '../../components/Button/LoadingButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomModal from '../../components/CustomModal/index';
import Swal from 'sweetalert2';
import ArticleIcon from '@mui/icons-material/Article';
import DateRangeIcon from '@mui/icons-material/DateRange';
import dayjs from "dayjs";
import TablaDetalleDevolucion from "./tablaDetalleDevolcion";


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

export default function DetalleDevolucion(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { dataPrestamo, cerrarModal } = props;
  const [obsevacion, setObservacion] = React.useState('');
  const [detalle, setDetalle] = React.useState(false);
  const [arrDetalle, setArrDetalle] = React.useState([]);
  const [numero, setNumero] = React.useState([]);
  const [mora, setMora] = React.useState(0);
  const [monto, setMonto] = React.useState(0.0);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataPrestamo.detallePrestamo.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onChangeObservacion = (event) => {

    setObservacion(event.target.value)
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetalle = () => {
    setDetalle(true);

  };
  const handleCloseDetalle = () => {
    setDetalle(false);
  };
  React.useEffect(() => {
    (async () => {
      const response = await http.get("/api/devolucion/codigo");
      setNumero(response.data)

    })();
  }, []);

  


  const agregarLibro = (row) => {


    if (arrDetalle.length === 0) {
      const arrDocumentos = [];
      arrDocumentos.push({
        ejemplar: row,
        item: arrDocumentos.length + 1
      });
      setArrDetalle(arrDocumentos);

      console.log('libros', arrDocumentos)

      Swal.fire({
        icon: 'success',
        title: 'Adjuntar Libro',
        text: 'Libro Adjuntado',
        timer: 2000
      });
    } else {

      const arrDocumentos = arrDetalle;

      const maxItem = arrDocumentos.map((doc) => doc.item);
      const maxI = Math.max(...maxItem);

      const existingBook = arrDocumentos.find((libro) => libro.ejemplar.libro.codigo === row.libro.codigo);

      if (existingBook) {
        Swal.fire({
          icon: 'error',
          title: 'Adjuntar Libro',
          text: 'El libro ya fue adjuntado previamente',
          timer: 2000
        });
      } else {
        arrDocumentos.push({

          ejemplar: row,
          item: maxI + 1
        });
        setArrDetalle(arrDocumentos);

        console.log('libros', arrDocumentos)

        Swal.fire({
          icon: 'success',
          title: 'Registro de Devolucion',
          text: 'Libro Adjuntado',
          timer: 2000
        });
      }
    }
  };

  const dataDetalle = (arrDocumentos) => {
    setArrDetalle(arrDocumentos);
  };

 

  const registrarRetiro = async () => {



    if (arrDetalle.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Registro de Devolucion',
        text: 'Debe Adjuntar los libros',
        timer: 2000
      });
    } else if (arrDetalle.length !== dataPrestamo.detallePrestamo.length) {
      Swal.fire({
        title: '¡Alerta!',
        // eslint-disable-next-line no-useless-concat
        html: `No adjunto algunos libros detallados en el retiro` + ' desea continuar?',
        showCancelButton: true,
        backdrop: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, continuar!'
      }).then(async (result) => {
        if (result.value) {
          const user = JSON.parse(localStorage.getItem('user'));
          const moraData = calcularMora() === 0.0 ? 0 : 1
          const montoData = calcularMora() === 0.0 ? null : calcularMora();
          const itemArray = arrDetalle.map(item => (item.ejemplar ));
          const data = {
            devolucion:{
              num_prestamo: dataPrestamo.num_prestamo,
              num_devolucion: numero,
              fechaDevolucion: dayjs().format('YYYY-MM-DD'),
              observaciones: obsevacion,
              mora: moraData,
              monto: montoData,
              usuario: {
                codigo: user.codigo
              }
            },
            codigoSede: dataPrestamo.sede.codigo,
            detalleDevolucion: itemArray
          }

          console.log('Response:',data);
    

                      try {
                       const response = await http.post(`/api/devolucion/devolver/${dataPrestamo.codigo}`, data);

                      console.log('Response:', response.data);

                      Swal.fire({
                       icon: 'success',
                      title: 'Registro de Devolucion',
                      text: 'Registro exitoso',
                        timer: 2000
                      });

                      cerrarModal(false)
                    } catch (error) {
                      // Handle the error
                       console.error('Axios error:', error);
                       }
        }
      });
    } else {

      const user = JSON.parse(localStorage.getItem('user'));
          const moraData = calcularMora() === 0.0 ? 0 : 1
          const montoData = calcularMora() === 0.0 ? null : calcularMora();
          const itemArray = arrDetalle.map(item => (item.ejemplar ));
          const data = {
            devolucion:{
              num_prestamo: dataPrestamo.num_prestamo,
              num_devolucion: numero,
              fechaDevolucion: dayjs().format('YYYY-MM-DD'),
              observaciones: obsevacion,
              mora: moraData,
              monto: montoData,
              usuario: {
                codigo: user.codigo
              }
            },
            codigoSede: dataPrestamo.sede.codigo,
            detalleDevolucion: itemArray
          }

      console.log(data)

      try {
        const response = await http.post(`/api/devolucion/devolver/${dataPrestamo.codigo}` , data);

        console.log('Response:', response.data);
        
        Swal.fire({
        icon: 'success',
        title: 'Registro de Devolucion',
        text: 'Registro exitoso',
        timer: 2000
      });

      cerrarModal(false)

      
      } catch (error) {
        // Handle the error
        console.error('Axios error:', error);
      }

      

    }

  

  };

  const calcularMora =()=> { 

    const devolucion = dayjs(dataPrestamo.fechaDevolucion);
    if(devolucion.isBefore(dayjs())){
      return 5.00
    }
      return 0.00
    
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ mt: 1, mb: 2.5, mx: 1 }}>
              <Divider>
                <Typography variant="h4" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                  Registra tu Devolución
                </Typography>
              </Divider>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ height: '60px' }} fullWidth>
              <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                <ArticleIcon color="primary" fontSize="large" />
                <TextField
                  fullWidth
                  size="small"
                  name="codigo"
                  type="text"
                  label="Numero de Retiro"
                  value={numero}
                />
              </FlexBox>

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ height: '60px' }} fullWidth>
              <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                <DateRangeIcon color="primary" fontSize="large" />
                <TextField
                  fullWidth
                  size="small"
                  name="fechaRetiro"
                  type="text"
                  label="Fecha de Registro"
                  value={dataPrestamo.fechaCreacion}
                />
              </FlexBox>

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ height: '60px' }} fullWidth>
              <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                <DateRangeIcon color="primary" fontSize="large" />
                <TextField
                  fullWidth
                  size="small"
                  name="fechaRetiro"
                  type="text"
                  label="Fecha Maxima de Retiro"
                  value={dataPrestamo.fechaSalida}
                />
              </FlexBox>

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ height: '60px' }} fullWidth>
              <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                <DateRangeIcon color="primary" fontSize="large" />
                <TextField
                  fullWidth
                  size="small"
                  name="fechaDevolucion"
                  type="text"
                  label="Fecha maxima de Devolucion"
                  value={dataPrestamo.fechaDevolucion}
                />
              </FlexBox>

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FormControl sx={{ height: '60px' }}>
              <CustomLoadingButton
                type="submit"
                startIcon={<LoupeIcon sx={{ height: '15px' }} />}
                variant="contained"
                style={{
                  marginTop: 2,
                  backgroundColor: '#ffce73',
                  fontWeight: 'lighter',
                  color: 'black',
                  fontSize: '15px',
                  height: '28px'
                }}
                onClick={handleOpenDetalle}

              >
                Ver Detalle
              </CustomLoadingButton>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Paper >
              <Table>
                <TableHead sx={{ bgcolor: 'success.main' }} style={{ backgroundColor: '#BEBEBE' }}>
                  <TableRow>
                    <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }}>ID Ejemplar</TableCell>
                    <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }} align="left">
                      Libro
                    </TableCell>
                    <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }} align="rigth">
                      Autor
                    </TableCell>
                    <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }} align="rigth">
                      Genero
                    </TableCell>
                    <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }} align="rigth">
                      Edicion
                    </TableCell>
                    <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }} align="rigth">
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0 ? dataPrestamo.detallePrestamo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : dataPrestamo.detallePrestamo).map(
                    (row, index) => (
                      <TableRow key={index + 1}>
                        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                          {row.ejemplar}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                          {row.libro?.nombre}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                          {row.libro?.autor}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                          {row.libro?.genero?.nombre}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                          {row.libro?.edicion}
                        </TableCell>
                        <TableCell align="center" style={{ justifyContent: 'center', textAlign: '-webkit-center' }}>
                          <CustomLoadingButton
                            type="submit"
                            startIcon={<AddCircleIcon />}
                            variant="contained"
                            style={{
                              marginTop: 2,
                              backgroundColor: '#46d246',
                              fontWeight: 'lighter',
                              fontSize: '15px',
                              height: '28px'
                            }}
                            onClick={() => agregarLibro(row)}
                          >
                            Agregar
                          </CustomLoadingButton>
                        </TableCell>
                      </TableRow>
                    )
                  )}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={3}
                      count={dataPrestamo.detallePrestamo.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Filas por página:"
                      labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>

          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <FormControl sx={{ height: '60px' }} fullWidth>
              <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                <ArticleIcon color="primary" fontSize="large" />
                <TextField
                  fullWidth
                  size="small"
                  name="codigo"
                  multiline
                  minRows={2}
                  maxRows={3}
                  type="text"
                  label="Observacion"
                  value={obsevacion}
                  onChange={onChangeObservacion}
                />
              </FlexBox>

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FormControl sx={{ height: '60px' }} fullWidth>
              <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                <AttachMoneyIcon color="primary" fontSize="large" />
                <TextField
                  fullWidth
                  size="small"
                  name="monto"
                  type="text"
                  label="Monto a Pagar"
                  value={calcularMora()}
                />
              </FlexBox>

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
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
                }}
                onClick={registrarRetiro}
              >
                Registrar Devolucion
              </CustomLoadingButton>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <CustomModal open={detalle} handleClose={handleCloseDetalle} title="Detalle del Prestamo" styles={stylesModal}>
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
              <TablaDetalleDevolucion propiedades={arrDetalle} datahijo={dataDetalle} />
            </Grid>

          </Grid>
        </div>
      </CustomModal>
    </>
  )
}