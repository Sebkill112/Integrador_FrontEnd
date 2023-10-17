import React from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box, Divider, FormControl, Grid, MenuItem, TableHead, TextField, Typography } from "@mui/material";
import NavBar from "../../layouts/appBar";
import http from "../../http";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
import TablaDetallePrestamo from './detalleTable';


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

export default function Prestamos() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [libros, setLibros] = React.useState([]);
  const [sedes, setSedes] = React.useState([]);
  const [sede, setSede] = React.useState(0);
  const [rows, setRows] = React.useState(libros);
  const [detalle, setDetalle] = React.useState(false);
  const [arrDetalle, setArrDetalle] = React.useState([]);
  const [numero, setNumero] = React.useState('');
  const [searched, setSearched] = React.useState('');
  const actual = new Date();
  const [retiro] = React.useState(actual.getDate() + 3);
  const [devolucion] = React.useState(actual.getDate() + 10);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function requestSearch(searchedVal) {
    const filteredRows = libros.filter((row) => {
      return row.nombre.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  }

  function cancelSearch() {
    setSearched("");
    setRows(libros);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  React.useEffect(() => {
    (async () => {
      const response = await http.get("/api/sede/listado");
      setSedes(response.data)

    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      const response = await http.get("/api/prestamo/codigo");
      setNumero(response.data)

    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      const response = await http.get(`/api/libroSede/listado?cod=${sede}`);
      const data = response.data

      const mapeados = data.map(item => {
        const libro = item[0]; // Información del libro
        const stock = item[1];
        return {
          codigo: libro.codigo,
          nombre: libro.nombre,
          editorial: {
            codigo: libro.editorial.codigo,
            nombre: libro.editorial.nombre
          },
          autor: libro.autor,
          genero: {
            codigo: libro.genero.codigo,
            nombre: libro.genero.nombre
          },
          edicion: libro.edicion,
          estado: libro.estado,
          stock: stock

        };
      });

      setLibros(mapeados);

    })();
  }, [sede]);

  React.useEffect(() => {
    setRows(libros);
  }, [libros]);


  const onChangeSede = (event) => {
    setSede(event.target.value);
  };

  const handleOpenDetalle = () => {
    setDetalle(true);

  };
  const handleCloseDetalle = () => {
    setDetalle(false);
  };

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

  const agregarLibro = (row) => {


    if (arrDetalle.length === 0) {
      const arrDocumentos = [];
      arrDocumentos.push({

        codigo: row.codigo,
        nombre: row.nombre,
        autor: row.autor,
        editorial: row.editorial.nombre,
        genero: row.genero.nombre,
        edicion: row.edicion,
        item: arrDocumentos.length + 1
      });
      setArrDetalle(arrDocumentos);

      console.log('libros', arrDocumentos)

      Swal.fire({
        icon: 'success',
        title: 'Registro de Riesgo',
        text: 'Archivo Adjuntado',
        timer: 2000
      });
    } else {

      const arrDocumentos = arrDetalle;

      const maxItem = arrDocumentos.map((doc) => doc.item);
      const maxI = Math.max(...maxItem);

      const existingBook = arrDocumentos.find((libro) => libro.codigo === row.codigo);

      if (existingBook) {
        Swal.fire({
          icon: 'error',
          title: 'Adjuntar Libro',
          text: 'El libro ya fue adjuntado previamente',
          timer: 2000
        });
      } else {
        arrDocumentos.push({

          codigo: row.codigo,
          nombre: row.nombre,
          autor: row.autor,
          editorial: row.editorial.nombre,
          genero: row.genero.nombre,
          edicion: row.edicion,
          item: maxI + 1
        });
        setArrDetalle(arrDocumentos);

        console.log('libros', arrDocumentos)

        Swal.fire({
          icon: 'success',
          title: 'Registro de Riesgo',
          text: 'Archivo Adjuntado',
          timer: 2000
        });
      }
    }
  };

  const dataDetalle = (arrDocumentos) => {
    setArrDetalle(arrDocumentos);
  };

  function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', {
      month: '2-digit',
    });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [year, month, day].join('-');
  }

  return (
    <>
      <NavBar />
      <Box height={50} />
      <Box display={'flex'}>
        <Sidenavs />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={12} md={12}>
              <Box sx={{ mt: 1, mb: 2.5, mx: 1 }}>
                <Divider>
                  <Typography variant="h4" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                    Registra tu Prestamo
                  </Typography>
                </Divider>
              </Box>
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
                    label="Numero de Prestamo"
                    value={numero}
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
                    name="fechaRetiro"
                    type="text"
                    label="Fecha Maxima de Retiro"
                    value={formatDate(retiro)}
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
                    label="Fecha de Devolucion"
                    value={formatDate(devolucion)}
                  />
                </FlexBox>

              </FormControl>
            </Grid>

            {arrDetalle.length !== 0 && (
              <Grid item xs={12} sm={12} md={6}>
                <FormControl sx={{ height: '60px' }} fullWidth>
                  <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                    <ApartmentIcon color="primary" fontSize="large" />
                    <TextField
                      fullWidth
                      size="small"
                      name="sucursal"
                      type="text"
                      select
                      disabled
                      label="Sucursal"
                      value={sede}
                      onChange={onChangeSede}
                    >
                      <MenuItem value={0}>
                        Seleccione Una Sede
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
            )}
            {arrDetalle.length === 0 && (
              <Grid item xs={12} sm={12} md={6}>
                <FormControl sx={{ height: '60px' }} fullWidth>
                  <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                    <ApartmentIcon color="primary" fontSize="large" />
                    <TextField
                      fullWidth
                      size="small"
                      name="sucursal"
                      type="text"
                      select
                      label="Sucursal"
                      value={sede}
                      onChange={onChangeSede}
                    >
                      <MenuItem value={0}>
                        Seleccione Una Sede
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
            )}
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
                  }}

                >
                  Cambiar Sede
                </CustomLoadingButton>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
            <Paper>
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                  <TableHead sx={{ bgcolor: 'success.main' }} style={{ backgroundColor: '#BEBEBE' }}>
                    <TableRow>
                      <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }}>Codigo</TableCell>
                      <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }}>Nombre</TableCell>
                      <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }}>Autor</TableCell>
                      <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }}>
                        Editorial
                      </TableCell>
                      <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }}>Genero</TableCell>
                      <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }}>Edicion</TableCell>
                      <TableCell style={{ color: '#303030', fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length === 0 && (
                      <TableRow>
                        <TableCell component="td" colSpan={3}>
                          <Box
                            sx={{
                              p: 3,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize: '1rem'
                            }}
                          >
                            No hay libros disponibles en la sucursal
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}

                    {(rowsPerPage > 0
                      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : rows
                    ).map((row) => (
                      <TableRow key={row.codigo}>
                        <TableCell component="th" scope="row">
                          {row.codigo}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.nombre}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.autor}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.editorial.nombre}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.genero.nombre}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.edicion}
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <div style={{ justifyContent: 'center', display: 'flex', gap: '10px' }}>
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
                              onClick={() => agregarLibro(row)}

                            >
                              Añadir
                            </CustomLoadingButton>

                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
              </Paper>
            
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
                  }}
                  onClick={handleOpenDetalle}

                >
                  Ver Detalle
                </CustomLoadingButton>
              </FormControl>
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
                  }}

                >
                  Registrar Prestamo
                </CustomLoadingButton>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
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

              <TablaDetallePrestamo propiedades={arrDetalle} datahijo={dataDetalle} />
            </Grid>

          </Grid>
        </div>
      </CustomModal>
    </>
  )
}