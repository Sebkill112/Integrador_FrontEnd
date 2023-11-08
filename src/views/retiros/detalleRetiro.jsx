import React from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box, Divider, FormControl, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
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
import TablaDetalleRetiro from "./detalleTableRetiro";


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

export default function DetalleRetiro(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { dataPrestamo, cerrarModal } = props;
  const [ejemplares, setEjemplares] = React.useState([]);
  const [libro, setLibro] = React.useState(0);
  const [obsevacion, setObservacion] = React.useState('');
  const [detalle, setDetalle] = React.useState(false);
  const [arrDetalle, setArrDetalle] = React.useState([]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ejemplares.length) : 0;

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


  const onChangeLibro = (event) => {
    setLibro(event.target.value);
  };

  const handleOpenDetalle = () => {
    setDetalle(true);

  };
  const handleCloseDetalle = () => {
    setDetalle(false);
  };

  React.useEffect(() => {
    (async () => {
      const response = await http.get(`/api/ejemplar/estado?libro=${libro}&sede=${dataPrestamo.sede?.codigo}`);
      setEjemplares(response.data);

    })();
  }, [libro]);



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
        title: 'Registro de Riesgo',
        text: 'Libro Adjuntado',
        timer: 2000
      });
    } else {

      const arrDocumentos = arrDetalle;

      const maxItem = arrDocumentos.map((doc) => doc.item);
      const maxI = Math.max(...maxItem);

      const existingBook = arrDocumentos.find((libro) => libro.ejemplar.libroEjemplar.codigo === row.libroEjemplar.codigo);

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
          title: 'Registro de Retiro',
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
        title: 'Registro de Retiro',
        text: 'Debe Adjuntar los libros',
        timer: 2000
      });
    } else if (arrDetalle.length !== dataPrestamo.detallePrestamo.length) {
      Swal.fire({
        title: '¡Alerta!',
        // eslint-disable-next-line no-useless-concat
        html: `No adjunto algunos ejemplares detallados en el prestamo` + ' desea continuar?',
        showCancelButton: true,
        backdrop: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, continuar!'
      }).then(async (result) => {
        if (result.value) {
          const itemArray = arrDetalle.map(item => (item.ejemplar));
          const data = {
            estado: "Retirado",
            codSede: dataPrestamo.sede.codigo,
            numPrestamo: dataPrestamo.num_prestamo,
            observacion: obsevacion,
            ejemplares: itemArray
          }

          console.log(data)

          try {
            const response = await http.put(`/api/prestamo/retiro/${dataPrestamo.codigo}`, data);

            console.log('Response:', response.data);

            Swal.fire({
              icon: 'success',
              title: 'Registro de Retiro',
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

      const itemArray = arrDetalle.map(item => (item.ejemplar));
      const data = {
        estado: "Retirado",
        codSede: dataPrestamo.sede.codigo,
        numPrestamo: dataPrestamo.num_prestamo,
        observacion: obsevacion,
        ejemplares: itemArray
      }

      console.log(data)

      try {
        const response = await http.put(`/api/prestamo/retiro/${dataPrestamo.codigo}`, data);

        console.log('Response:', response.data);

        Swal.fire({
          icon: 'success',
          title: 'Registro de Retiro',
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

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ mt: 1, mb: 2.5, mx: 1 }}>
              <Divider>
                <Typography variant="h4" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                  Registra tu Retiro
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
                  label="Numero de Prestamo"
                  value={dataPrestamo.num_prestamo}
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
                  label="Fecha de Devolucion"
                  value={dataPrestamo.fechaDevolucion}
                />
              </FlexBox>

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl sx={{ height: '60px' }} fullWidth>
              <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                <BookIcon color="primary" fontSize="large" />
                <TextField
                  fullWidth
                  select
                  size="small"
                  name="libros"
                  type="text"
                  label="Libros del Prestamo"
                  value={libro}
                  onChange={onChangeLibro}
                >
                  <MenuItem key={0} value={0}>
                    [Seleccione libro]
                  </MenuItem>
                  {dataPrestamo.detallePrestamo?.map((item) => (
                    <MenuItem key={item.libro?.codigo} value={item.libro?.codigo}>
                      {item.libro?.nombre}
                    </MenuItem>
                  ))}

                </TextField>
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
                  backgroundColor: '#00cccc',
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
                  {(rowsPerPage > 0 ? ejemplares.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : ejemplares).map(
                    (row, index) => (
                      <TableRow key={index + 1}>
                        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                          {row.codigo}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                          {row.libroEjemplar?.nombre}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                          {row.libroEjemplar?.autor}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                          {row.libroEjemplar?.genero?.nombre}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                          {row.libroEjemplar?.edicion}
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
                      count={ejemplares.length}
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
                }}
                onClick={registrarRetiro}
              >
                Registrar Retiro
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
              <TablaDetalleRetiro propiedades={arrDetalle} datahijo={dataDetalle} />
            </Grid>

          </Grid>
        </div>
      </CustomModal>
    </>
  )
}