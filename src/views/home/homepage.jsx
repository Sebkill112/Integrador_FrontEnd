import React from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box } from '@mui/material';
import NavBar from "../../layouts/appBar";
import CarouselHome from "./components/carousel.jsx";
import MainHome from "./components/main";
import FooterHome from "./components/footer";
import LogoHome from "./components/logo";

export default function HomePage() {    

    return (
        <>
            <NavBar />
            <Box height={30} />
            <Box display={'flex'}>
                <Sidenavs />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>                    
                    <LogoHome />
                    <CarouselHome />                     
                    <MainHome />
                    <FooterHome />
                </Box>
            </Box>
        </>
    )
}