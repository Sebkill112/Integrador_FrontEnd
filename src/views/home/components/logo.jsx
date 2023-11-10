import React from "react";
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import CustomLoadingButton from "../../../components/Button/LoadingButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function LogoHome() {
    const navigate = useNavigate();

    const handleToLogin = () => {
        navigate('/login');
    }

    return (
        <Box
            component="header"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                textAlign: 'left',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                alignItems: 'center',
                padding: '17px',
                zIndex: 1000, 
            }}
        >
            <img src="https://files.logoscdn.com/v1/assets/13817708/optimized" alt="logo_biblioteca" style={{ width: '150px', height: '60px' }} />
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
                    height: '28px',
                }}
                onClick={handleToLogin}
            >
                Iniciar sesión
            </CustomLoadingButton>
        </Box>
    );
}
