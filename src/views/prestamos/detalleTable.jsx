
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import CustomLoadingButton from '../../components/Button/LoadingButton';
import Swal from 'sweetalert2';
import { TableHead } from '@mui/material';


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
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};

function TablaDetallePrestamo(props) {
    const { classes, propiedades, datahijo } = props;
    const theme = useTheme();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - propiedades?.length) : 0;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const eliminarDocumento = (id) => {
        Swal.fire({
            title: '¡Alerta!',
            text: '¿Esta seguro de eliminar el libro de tu prestamo?',
            type: 'warning',
            showCancelButton: true,
            backdrop: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.value) {
                const arrDoc = [];
                const documentos = propiedades;
                if (documentos.length === 1) {
                    datahijo([]);
                } else {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const iterator of documentos) {

                        if (iterator.item !== id) {
                            arrDoc.push(iterator);
                        }
                    }
                    datahijo(arrDoc);
                }
            }
        });
    };


    return (
        <>
            <Paper>
                <Table>
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
                        {propiedades.length === 0 && (
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
                                        No hay libros en el prestamo
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}

                        {(rowsPerPage > 0 ? propiedades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : propiedades).map(
                            (row, index) => (
                                <TableRow key={index + 1}>
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
                                        {row.editorial}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.genero}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.edicion}
                                    </TableCell>
                                    <TableCell align="center" style={{ justifyContent: 'center', textAlign: '-webkit-center' }}>
                                        <CustomLoadingButton
                                            type="submit"
                                            startIcon={<DeleteSweepIcon />}
                                            variant="contained"
                                            style={{
                                                marginTop: 2,
                                                backgroundColor: 'rgb(219 0 0)',
                                                fontWeight: 'lighter',
                                                fontSize: '15px',
                                                height: '28px'
                                            }}
                                            onClick={() => eliminarDocumento(row.item)}
                                        >
                                            Eliminar
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
                                count={propiedades.length}
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
        </>
    );
}

export default TablaDetallePrestamo;