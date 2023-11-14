import React, { useState, useEffect } from 'react';
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
import { useFormik } from 'formik';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

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



    const validate = (values) => {
        const errors = {};

        if (!values.nombre) {
            errors.nombre = 'El campo Nombre es obligatorio';
        } else if (values.nombre.length < 2 || values.nombre.length > 40) {
            errors.nombre = 'El nombre debe tener entre 2 y 40 caracteres';
        }

        if (!values.autor) {
            errors.autor = 'El campo Autor es obligatorio';
        } else if (values.autor.length < 2 || values.autor.length > 40) {
            errors.autor = 'El autor debe tener entre 2 y 40 caracteres';
        }

        if (!values.edicion) {
            errors.edicion = 'El campo Edicion es obligatorio';
        } else if (values.edicion.length < 2 || values.edicion.length > 40) {
            errors.edicion = 'El edicion debe tener entre 2 y 40 caracteres';
        }

        if (values.editorial === '0' || values.editorial === '-1') {
            errors.editorial = 'Por favor, seleccione una editorial válida';
        }
    
        if (values.genero === '0' || values.genero === '-1') {
            errors.genero = 'Por favor, seleccione un género válido';
        }

        return errors;
    };


    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    const areAllFieldsValid = () => {
    const errorValues = Object.values(formik.errors);

    const allFieldsFilled = Object.values(formik.values).every((value) => {
        return typeof value === 'string' && value.trim() !== '';
    });

    const noErrors = errorValues.every((error) => !error);

    const allFieldsValid = allFieldsFilled && noErrors;
    setIsButtonDisabled(!allFieldsValid); // Deshabilita el botón si no todos los campos son válidos
    return allFieldsValid;
};

    const areAllFieldsEmpty = () => {
        const formValues = Object.values(formik.values);
        return formValues.every(value => {
            if (typeof value === 'string') {
                return value.trim() === '';
            }
            return true; // Si no es una cadena, considerarlo como lleno
        });
    };


    const updateButtonStatus = () => {
        const allFieldsValid = areAllFieldsValid();
        setIsButtonDisabled(!allFieldsValid);
    };

    const formik = useFormik({
        initialValues: {
            nombre: '',
            editorial: '0', // Valor inicial no válido
            autor: '',
            genero: '0', // Valor inicial no válido
            edicion: '',

        },
        validate,
    initialErrors: {
        nombre: 'El campo Nombre es obligatorio',
        
    },
        onSubmit: (values) => {
            // Coloca aquí la lógica de envío de datos si los campos son válidos
            // Puedes acceder a los valores válidos a través de `values`
            console.log(values);
        },
        initialTouched: {
            nombre: true,
           
        },
    });

    

    useEffect(() => {
        formik.isValid && formik.submitCount > 0 && formik.isValidating && formik.submitForm();
    }, [formik]);



    const registrarLibro = async () => {
        const data = {

            nombre: formik.values.nombre,
            editorial: {
                codigo: parseInt(formik.values.editorial) // Usar formik.values.editorial
            },
            autor: formik.values.autor,
            genero: {
                codigo: parseInt(formik.values.genero) // Usar formik.values.genero
            },
            edicion: formik.values.edicion,
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
                // limpiarInput()
                formik.resetForm();
                cerrarModal(false);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registro de Libro',
                    text: `No se pudo registrar el libro, valide con el administrador`,
                });
            });
            formik.handleSubmit();
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
                            <DriveFileRenameOutlineIcon color="primary" fontSize="large" />
                            <TextField
                                fullWidth
                                size="small"
                                id="nombre"
                                name="nombre"
                                type="text"
                                label="Titulo"
                                value={formik.values.nombre}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    updateButtonStatus(); // Call this function when the value changes
                                }} onBlur={formik.handleBlur}
                                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                helperText={formik.touched.nombre ? formik.errors.nombre : ''}
                            />
                        </FlexBox>

                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3.5}>
                    <FormControl sx={{ height: '60px' }} fullWidth>
                        <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                            <MenuBookIcon color="primary" fontSize="large" />
                            <TextField
                                fullWidth
                                select
                                size="small"
                                id="genero"
                                name="genero"
                                type="text"
                                label="Genero"
                                value={formik.values.genero}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    updateButtonStatus();
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.genero && Boolean(formik.errors.genero)}
                                helperText={formik.touched.genero ? formik.errors.genero : ''}
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
                            <DriveFileRenameOutlineIcon color="primary" fontSize="large" />
                            <TextField
                                fullWidth
                                size="small"
                                id="autor"
                                name="autor"
                                type="text"
                                label="Autor"
                                value={formik.values.autor}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    updateButtonStatus(); // Call this function when the value changes
                                }} onBlur={formik.handleBlur}
                                error={formik.touched.autor && Boolean(formik.errors.autor)}
                                helperText={formik.touched.autor ? formik.errors.autor : ''}

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
                                id="editorial"
                                name="editorial"
                                type="text"
                                label="Editorial"
                                value={formik.values.editorial}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    updateButtonStatus();
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.editorial && Boolean(formik.errors.editorial)}
                                helperText={formik.touched.editorial ? formik.errors.editorial : ''}
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
                            <EditCalendarIcon color="primary" fontSize="large" />
                            <TextField
                                fullWidth
                                size="small"
                                id="edicion"
                                name="edicion"
                                type="text"
                                label="Edicion"
                                value={formik.values.edicion}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    updateButtonStatus(); // Call this function when the value changes
                                }} onBlur={formik.handleBlur}
                                error={formik.touched.edicion && Boolean(formik.errors.edicion)}
                                helperText={formik.touched.edicion ? formik.errors.edicion : ''}

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
                                backgroundColor: '#33cc33',
                                fontWeight: 'lighter',
                                color: 'black',
                                fontSize: '15px',
                                height: '28px'
                            }}
                            onClick={registrarLibro}
                            disabled={areAllFieldsEmpty() || !formik.isValid}
                        >
                            Registrar
                        </CustomLoadingButton>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}