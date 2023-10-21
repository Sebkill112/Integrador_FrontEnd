import React from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box } from "@mui/material";
import NavBar from "../../layouts/appBar";

export default function MantemientoClientes(){

    return (
        <>
        <NavBar/>
        <Box height={30}/>
         <Box display={'flex'}>
        <Sidenavs />
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <h1>Libros</h1>
        </Box>
        
        </Box>
        </>
    )
}