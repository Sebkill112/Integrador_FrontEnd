import React from "react";
import Sidenavs from "../../layouts/sidenavs";
import { Box } from '@mui/material';
import NavBar from "../../layouts/appBar";
import CarouselHome from "./components/carousel.jsx";
import MainHome from "./components/main";
import FooterHome from "./components/footer";
import LogoHome from "./components/logo";
import WatsonAssistantChat from "../bot/bot.jsx";

export default function HomePage() {

    return (
        <>
            <Box display={'flex'}>
                <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                    <LogoHome />
                    <CarouselHome />
                    <MainHome />
                    <FooterHome />
                    <WatsonAssistantChat/>
                </Box>
            </Box>
        </>
    )
}