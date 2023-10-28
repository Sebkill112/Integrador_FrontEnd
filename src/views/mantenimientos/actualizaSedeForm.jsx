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


export default function ActualizacionSede(props) {
    
    const { cerrarModal, dataSede } = props;
    const [nombre, setNombre] = React.useState('');
    const [direccion, setDireccion] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [contactoSede, setContactoSede] = React.useState('');
    const [estado, setEstado] = React.useState(0);

    React.useEffect(() => {
        setNombre(dataSede.nombre);
        setDireccion(dataSede.direccion);
        setTelefono(dataSede.telefono);
        setContactoSede(dataSede.contactoSede);
        setEstado(dataSede.estado);
    }, []);    

    const onchangeNombre = (event) =>{
        setNombre(event.target.value);
    }
    const onchangeDireccion = (event) =>{
        setDireccion(event.target.value);
    }
    const onchangeTelefono = (event) =>{
        setTelefono(event.target.value);
    }
    const onchangeContactoSede = (event) =>{
        setContactoSede(event.target.value);
      }
    const onChangeEstado = (event) => {
        setEstado(event.target.value);
    };


    const limpiarInput = () => {
        setNombre('');
        setDireccion('');
        setTelefono('');
        setContactoSede('');
    };

    
    const actualizaSede = async () => {
        const data = {
            codigo : dataSede.codigo,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            contactoSede: contactoSede,
            estado: estado

        }
        

        await http.put('/api/sede/actualiza', data)
            .then((response) => {

                Swal.fire({
                    icon: 'success',
                    title: 'Actualizacion de Sede',
                    text: 'Actualizacion exitosa',
                    timer: 2000
                });
                limpiarInput()
                cerrarModal(false);
            })
            .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Registro de Sede',
                        text: `No se pudo actualizar el sede, valide con el administrador`,
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
                            Datos del Sede
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
                            name="Nombre"
                            type="text"
                            label="Nombre"
                            value={nombre}
                            onChange={onchangeNombre}
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
                            size="small"
                            name="Direccion"
                            type="text"
                            label="Direccion"
                            value={direccion}
                            onChange={onchangeDireccion}
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
                            size="small"
                            name="Telefono"
                            type="number"
                            label="Telefono"
                            value={telefono}
                            onChange={onchangeTelefono}
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
                            size="small"
                            name="Contacto Sede"
                            type="text"
                            label="Contacto Sede"
                            value={contactoSede}
                            onChange={onchangeContactoSede}
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
                            size="small"
                            name="Estado"
                            type="text"
                            select
                            label="Estado"
                            value={estado}
                            onChange={onChangeEstado}
                        >
                            <MenuItem value={1}>
                                    Activo
                                </MenuItem>
                                <MenuItem value={0}>
                                    Inactivo
                                </MenuItem>
                        </TextField>

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
                        onClick={actualizaSede}
                    >
                        Actualizar
                    </CustomLoadingButton>
                </FormControl>
            </Grid>
        </Grid>
    </>
)
}