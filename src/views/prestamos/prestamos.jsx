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
  const [detalle, setDetalle] = React.useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - libros.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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


  const onChangeSede = (event) => {
    setSede(event.target.value);
  };

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
              <TableContainer component={Paper}>
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
                    {libros.length === 0 && (
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
                      ? libros.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : libros
                    ).map((row) => (
                      <TableRow key={row.name}>
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
                        count={libros.length}
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
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
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
                  Ver Detalle
                </CustomLoadingButton>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}