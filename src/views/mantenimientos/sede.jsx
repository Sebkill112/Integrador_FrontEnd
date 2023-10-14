import React from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box } from "@mui/material";
import NavBar from "../../layouts/appBar";

export default function MantemientoSedes(){

    return (
        <>
        <NavBar/>
        <Box height={30}/>
        <Box display={'flex'}>
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Sidenavs /><h1>Sedes</h1>
        </Box>
        </Box>
        </>
    )
}