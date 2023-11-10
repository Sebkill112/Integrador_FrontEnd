import React from "react";
import { Box, Typography } from '@mui/material';

export default function FooterHome() {

    return (
        <>
            <Box component="main"  style={{backgroundColor: '#1976D2', paddingTop:'3rem',paddingBottom:'3rem', margin: '0px'}}>
                <Typography style={{color: '#fff', fontSize: '15px'}}>© Copyright Biblioteca 2023 - Todos los derechos reservados.</Typography>
            </Box>
        </>
    )
}