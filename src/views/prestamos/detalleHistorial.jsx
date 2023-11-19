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

export default function DetalleHistorial(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { dataPrestamo } = props;
  const [detalle, setDetalle] = React.useState(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataPrestamo.detallePrestamo.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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




 
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ mt: 1, mb: 2.5, mx: 1 }}>
              <Divider>
                <Typography variant="h4" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                  Detalle  del Prestamo
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
                  label="Fecha maxima de Devolucion"
                  value={dataPrestamo.fechaDevolucion}
                />
              </FlexBox>

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

          <Grid item xs={12} sm={12} md={6}>
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
                  value={dataPrestamo.observaciones}
                />
              </FlexBox>

            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}