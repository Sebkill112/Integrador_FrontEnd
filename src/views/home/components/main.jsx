import React from "react";
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; // Asegúrate de agregar esta importación

export default function MainHome() {

    return (
        <>
            <Box component="main" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0px 60px', margin: '210px 17px 210px 17px' }}>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h3" style={{ color: '#1976D2', fontWeight: '600' }}>Visión</Typography>
                    <img src="https://img.freepik.com/vector-premium/ojo-vision-empresarial-busca-oportunidades-o-descubre-liderazgo-ideas-exito-visionario-espera-busqueda-futura-concepto-exito-empresario-mira-traves-binoculares-su-gran-ojo_212586-1695.jpg" alt="Visión" style={{ width: '40%', height: '60%', borderRadius: '50%', marginTop: '10px' }} />
                    <p style={{fontSize: '25px' }}>"Ser la plataforma líder que inspire a lectores de todas las edades a explorar el mundo a través de la lectura, proporcionando un acceso sencillo a una amplia variedad de libros y fomentando el amor por la literatura."</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h3" style={{ color: '#1976D2', fontWeight: '600' }}>Misión</Typography>
                    <img src="https://cdn-icons-png.flaticon.com/512/306/306875.png" alt="Misión" style={{ width: '40%', height: '60%', borderRadius: '50%', marginTop: '10px' }} />
                    <p style={{ fontSize: '25px' }}>"Facilitar el acceso a la sabiduría, la imaginación y el conocimiento a través de una aplicación de libros en línea que ofrezca una extensa biblioteca digital, experiencias de lectura enriquecedoras y contenido diverso para enriquecer la vida de nuestros usuarios."</p>
                </div>
            </Box>
            <Box style={{ textAlign: 'left', fontSize: '20px', color: '#fff', backgroundColor: '#2c3e50', padding: '20px', border: '0px solid #ddd' }}>
                <Typography variant="h3" style={{ color: '#1976D2', fontWeight: '600', textAlign: 'center' }}>Descripción</Typography>

                <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
                <StarIcon style={{ fontSize: '60px', color: '#fff' }} />
            </Box>

                <p style={{  fontSize: '25px', color: '#fff', paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px",paddingBottom:"20px"}}>
                    "Nuestra aplicación de biblioteca en línea es la puerta de entrada a un vasto mundo de conocimiento, entretenimiento y exploración literaria. Con acceso instantáneo a una extensa colección de libros digitales, nuestra aplicación está diseñada para satisfacer las necesidades de lectores ávidos y apasionados por la lectura. Ya sea que busques la última novela de tu autor favorito, material de estudio académico o historias cautivadoras para tus hijos, nuestra aplicación ofrece una experiencia de lectura conveniente y enriquecedora.
                    Descubre nuevos mundos, adquiere conocimientos, y sumérgete en historias cautivadoras, todo desde la comodidad de tu dispositivo móvil o computadora. Nuestra aplicación de biblioteca en línea te brinda la libertad de explorar, aprender y disfrutar de la lectura en cualquier momento y en cualquier lugar.
                </p>
                <Typography variant="h4" style={{ color: '#1976D2', fontWeight: '600', textAlign: 'left', paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px" }}>Características destacadas</Typography>

                <ul style={{ fontSize: '25px', color: '#fff', paddingLeft: "50px", paddingRight: "50px" }}>
                    <li>Acceso a miles de libros en múltiples géneros.</li>
                    <li>Opciones de lectura personalizadas y marcadores para un seguimiento fácil.</li>
                    <li>Biblioteca digital en constante crecimiento con nuevos títulos.</li>
                    <li>Compatibilidad con dispositivos móviles y acceso sin conexión.</li>
                    <li>Recomendaciones de libros personalizadas para descubrir nuevas lecturas.</li>
                    <li>Contenido infantil seguro y educativo.</li>
                </ul>
                <p style={{ fontSize: '25px', color: '#fff', paddingLeft: "50px", paddingRight: "50px", paddingTop: "30px" }}>
                    Únete a nuestra comunidad de amantes de la lectura y experimenta la versatilidad y la riqueza que nuestra aplicación de biblioteca en línea tiene para ofrecer. Amplía tus horizontes literarios y lleva tus libros contigo a donde quiera que vayas."
                </p>
            </Box>
            
        </>
    )
}