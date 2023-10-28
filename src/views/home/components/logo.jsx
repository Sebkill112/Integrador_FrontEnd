import React from "react";
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import CustomLoadingButton from "../../../components/Button/LoadingButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function LogoHome() {

    const navigate = useNavigate();

    const handleToLogin = () => {
        navigate('/login')
    }

    return (
        <>
            <Box component="main" style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', backgroundColor: '#1976d2', alignItems:'center', padding: '5px' }}>
                <img src="https://institutodeconcepcion.edu.pe/wp-content/uploads/2022/08/biblioteca-logo.png" alt="logo_biblioteca" style={{ width: '140px', height: '40px'}} />
                <CustomLoadingButton
                    type="submit"
                    startIcon={<AddCircleIcon sx={{ height: '15px' }} />}
                    variant="contained"
                    style={{
                        marginTop: 2,
                        backgroundColor: '#ffffff00',
                        fontWeight: 'lighter',
                        color: '#fff',
                        fontSize: '15px',
                        height: '28px'
                    }}
                    onClick={handleToLogin}

                >
                    Iniciar sesión
                </CustomLoadingButton>
            </Box>
        </>
    )
}