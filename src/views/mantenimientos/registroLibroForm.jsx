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



export default function RegistroLibro(props) {

    const { cerrarModal } = props;
    const [generos, setGeneros] = React.useState([]);
    const [editoriales, setEditoriales] = React.useState([]);
    const [nombre, setNombre] = React.useState('');
    const [editorial, setEditorial] = React.useState('0');
    const [genero, setGenero] = React.useState('0');
    const [edicion, setEdicion] = React.useState('');
    const [autor, setAutor] = React.useState('');




    React.useEffect(() => {
        (async () => {
            const response = await http.get("/api/util/genero");
            setGeneros(response.data)

        })();
    }, []);
    React.useEffect(() => {
        (async () => {
            const response = await http.get("/api/util/editorial");
            setEditoriales(response.data)

        })();
    }, []);




    const onChangeNombre = (event) => {
        setNombre(event.target.value);
    };
    const onChangeEditorial = (event) => {
        setEditorial(event.target.value);
    };
    const onChangeGenero = (event) => {
        setGenero(event.target.value);
    };
    const onChangeAutor = (event) => {
        setAutor(event.target.value);
    };
    const onChangeEdicion = (event) => {
        setEdicion(event.target.value);
    };


    const limpiarInput = () => {
        setNombre('');
        setGenero('');
        setEditorial('');
        setAutor('');
        setEdicion('');
    };




    const registrarLibro = async () => {
        const data = {

            nombre: nombre,
            editorial: {
                codigo: parseInt(editorial)
            },
            autor: autor,
            genero: {
                codigo: parseInt(genero)
            },
            edicion: edicion,
            estado: 1
        }


        await http.post('/api/libro/grabar', data)
            .then((response) => {

                Swal.fire({
                    icon: 'success',
                    title: 'Registro de Libro',
                    text: 'Registro exitoso',
                    timer: 2000
                });
                limpiarInput()
                cerrarModal(false);
            })
            .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Registro de Libro',
                        text: `No se pudo registrar el libro, valide con el administrador`,
                    });
            });
        
    };


return (
    <>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={12} md={12}>
                <Box sx={{ mt: 1, mb: 2.5, mx: 1 }}>
                    <Divider>
                        <Typography variant="h5" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                            Completa Los Datos del Libro
                        </Typography>
                    </Divider>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3.5}>
                <FormControl sx={{ height: '60px' }} fullWidth>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <ApartmentIcon color="primary" fontSize="large" />
                        <TextField
                            fullWidth
                            size="small"
                            name="titulo"
                            type="text"
                            label="Titulo"
                            value={nombre}
                            onChange={onChangeNombre}
                        />
                    </FlexBox>

                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3.5}>
                <FormControl sx={{ height: '60px' }} fullWidth>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <ApartmentIcon color="primary" fontSize="large" />
                        <TextField
                            fullWidth
                            select
                            size="small"
                            name="Genero"
                            type="text"
                            label="Genero"
                            value={genero}
                            onChange={onChangeGenero}
                        >
                            <MenuItem value={"0"}>
                                Seleccione Un Genero
                            </MenuItem>
                            {generos.map((item) => (
                                <MenuItem key={item.codigo} value={item.codigo}>
                                    {item.nombre}
                                </MenuItem>
                            ))}

                        </TextField>
                    </FlexBox>

                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3.5}>
                <FormControl sx={{ height: '60px' }} fullWidth>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <ApartmentIcon color="primary" fontSize="large" />
                        <TextField
                            fullWidth
                            size="small"
                            name="Autor"
                            type="text"
                            label="Autor"
                            value={autor}
                            onChange={onChangeAutor}
                        />
                    </FlexBox>

                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3.5}>
                <FormControl sx={{ height: '60px' }} fullWidth>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <ApartmentIcon color="primary" fontSize="large" />
                        <TextField
                            fullWidth
                            select
                            size="small"
                            name="Editorial"
                            type="text"
                            label="Editorial"
                            value={editorial}
                            onChange={onChangeEditorial}
                        >
                            <MenuItem value={"0"}>
                                Seleccione Una Editorial
                            </MenuItem>
                            {editoriales.map((item) => (
                                <MenuItem key={item.codigo} value={item.codigo}>
                                    {item.nombre}
                                </MenuItem>
                            ))}

                        </TextField>
                    </FlexBox>

                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={3.5}>
                <FormControl sx={{ height: '60px' }} fullWidth>
                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <ApartmentIcon color="primary" fontSize="large" />
                        <TextField
                            fullWidth
                            size="small"
                            name="Edicion"
                            type="text"
                            label="Edicion"
                            value={edicion}
                            onChange={onChangeEdicion}
                        />

                    </FlexBox>

                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={3.5}>
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
                        onClick={registrarLibro}

                    >
                        Registrar
                    </CustomLoadingButton>
                </FormControl>
            </Grid>
        </Grid>
    </>
)
}