import React from "react";
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; // Asegúrate de agregar esta importación

export default function MainHome() {
    const handleMouseOver = (event) => {
        event.target.style.transform = 'scale(1.1)';
      };
    
      const handleMouseOut = (event) => {
        event.target.style.transform = 'scale(1)';
      };
    return (
        <>
            {/* <Box style={{ textAlign: 'left', fontSize: '20px', color: '#000', backgroundColor: '#fff', padding: '20px', border: '0px solid #ddd' }}>
                <Typography variant="h3" style={{ color: '#1976D2', fontWeight: '600', textAlign: 'center' }}>Descripción</Typography>

                <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <StarIcon style={{ fontSize: '60px', color: '#000' }} />
                </Box>

                <p style={{ fontSize: '25px', color: '#000', paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px", paddingBottom: "20px" }}>
                    "Nuestra aplicación de biblioteca en línea es la puerta de entrada a un vasto mundo de conocimiento, entretenimiento y exploración literaria. Con acceso instantáneo a una extensa colección de libros digitales, nuestra aplicación está diseñada para satisfacer las necesidades de lectores ávidos y apasionados por la lectura. Ya sea que busques la última novela de tu autor favorito, material de estudio académico o historias cautivadoras para tus hijos, nuestra aplicación ofrece una experiencia de lectura conveniente y enriquecedora.
                    Descubre nuevos mundos, adquiere conocimientos, y sumérgete en historias cautivadoras, todo desde la comodidad de tu dispositivo móvil o computadora. Nuestra aplicación de biblioteca en línea te brinda la libertad de explorar, aprender y disfrutar de la lectura en cualquier momento y en cualquier lugar.
                </p>

            </Box> */}
            <Box style={{ textAlign: 'left', fontSize: '20px', color: '#000', backgroundColor: '#f4f4f4 ', paddingTop: "20px", paddingRight: "20px", paddingLeft: "20px", paddingBottom: '200px', border: '0px solid #ddd' }}>
                <Typography variant="h3" style={{ color: '#1976D2', fontWeight: '600', textAlign: 'center' }}>Explora un Mundo de Historias: Géneros de Libros</Typography>


                <p style={{ fontSize: '25px', color: '#000', paddingLeft: "100px", paddingRight: "100px", paddingTop: "10px", paddingBottom: "20px" }}>
                    ¡Bienvenido a nuestra biblioteca virtual! Estamos emocionados de ofrecerte una amplia variedad de géneros literarios para satisfacer todos los gustos.
                    Descubre un mundo de historias cautivadoras que te transportarán a lugares inimaginables y te sumergirán en emocionantes travesías.
                    Aquí hay algunos de los géneros que puedes encontrar:
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', paddingBottom: '20px' }}>
                    <div style={{ flex: '1', textAlign: 'center' }}>
                        <img
                            src="https://images.cdn1.buscalibre.com/fit-in/360x360/03/0a/030a419b5cbfda84843b6b9fdc5d8273.jpg"
                            alt="Visión"
                            style={{ width: '85%', height: '120%', marginBottom: '40px', transition: 'transform 0.3s ease-in-out' }}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        />                        
                        <Typography variant="body1" style={{ color: '#000', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Terror</Typography>
                    </div>

                    <div style={{ flex: '1', textAlign: 'center' }}>
                        <img src="https://www.tradandgo.com/wp-content/uploads/2021/02/510pbRtOp5L.jpg" 
                            alt="Visión"
                            style={{ width: '85%', height: '120%', marginBottom: '40px', transition: 'transform 0.3s ease-in-out' }}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        /> 
                        <Typography variant="body1" style={{ color: '#000', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Drama</Typography>
                    </div>

                    <div style={{ flex: '1', textAlign: 'center' }}>
                        <img src="https://cronicasdemagrat.files.wordpress.com/2017/05/9788484284888_1.jpg?w=1400" 
                        alt="Visión"
                            style={{ width: '85%', height: '120%', marginBottom: '40px', transition: 'transform 0.3s ease-in-out' }}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        /> 
                        <Typography variant="body1" style={{ color: '#000', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Romance</Typography>
                    </div>
                    <div style={{ flex: '1', textAlign: 'center' }}>
                        <img src="https://m.media-amazon.com/images/I/511BOH9D2BL.jpg" 
                         alt="Visión"
                            style={{ width: '85%', height: '120%', marginBottom: '40px', transition: 'transform 0.3s ease-in-out' }}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        /> 
                        <Typography variant="body1" style={{ color: '#000', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Ciencia Ficcion</Typography>
                    </div>
                    <div style={{ flex: '1', textAlign: 'center' }}>
                        <img src="https://images.cdn3.buscalibre.com/fit-in/360x360/d2/74/d2745514f8ea4de663d5c8c659a162b2.jpg" 
                        alt="Visión"
                            style={{ width: '85%', height: '120%', marginBottom: '40px', transition: 'transform 0.3s ease-in-out' }}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        /> 
                        <Typography variant="body1" style={{ color: '#000', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Mistero</Typography>
                    </div>

                    <div style={{ flex: '1', textAlign: 'center' }}>
                        <img src="https://i.pinimg.com/originals/00/c3/86/00c386dc52563cc21934e503d10e0eac.png" 
                         alt="Visión"
                            style={{ width: '85%', height: '120%', marginBottom: '40px', transition: 'transform 0.3s ease-in-out' }}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        /> 
                        <Typography variant="body1" style={{ color: '#000', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Fantasía</Typography>
                    </div>
                </div>

            </Box>
            <Box component="main" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0px 60px', margin: '100px 17px 100px 17px' }}>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h3" style={{ color: '#1976D2', fontWeight: '600' }}>Visión</Typography>
                    <img src="https://img.freepik.com/vector-premium/ojo-vision-empresarial-busca-oportunidades-o-descubre-liderazgo-ideas-exito-visionario-espera-busqueda-futura-concepto-exito-empresario-mira-traves-binoculares-su-gran-ojo_212586-1695.jpg" alt="Visión" style={{ width: '40%', height: '60%', borderRadius: '50%', marginTop: '10px' }} />
                    <p style={{ fontSize: '25px' }}>"Ser la plataforma líder que inspire a lectores de todas las edades a explorar el mundo a través de la lectura, proporcionando un acceso sencillo a una amplia variedad de libros y fomentando el amor por la literatura."</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h3" style={{ color: '#1976D2', fontWeight: '600' }}>Misión</Typography>
                    <img src="https://cdn-icons-png.flaticon.com/512/306/306875.png" alt="Misión" style={{ width: '40%', height: '60%', borderRadius: '50%', marginTop: '10px' }} />
                    <p style={{ fontSize: '25px' }}>"Facilitar el acceso a la sabiduría, la imaginación y el conocimiento a través de una aplicación de libros en línea que ofrezca una extensa biblioteca digital, experiencias de lectura enriquecedoras y contenido diverso para enriquecer la vida de nuestros usuarios."</p>
                </div>
            </Box>
            <Box style={{ textAlign: 'left', fontSize: '20px', color: '#000', backgroundColor: '#f4f4f4 ', padding: '20px', border: '0px solid #ddd' }}>
                <Typography variant="h3" style={{ color: '#1976D2', fontWeight: '600', textAlign: 'center' }}>Descripción</Typography>

                <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <StarIcon style={{ fontSize: '60px', color: '#000' }} />
                </Box>

                <p style={{ fontSize: '25px', color: '#000', paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px", paddingBottom: "20px" }}>
                    "Nuestra aplicación de biblioteca en línea es la puerta de entrada a un vasto mundo de conocimiento, entretenimiento y exploración literaria. Con acceso instantáneo a una extensa colección de libros digitales, nuestra aplicación está diseñada para satisfacer las necesidades de lectores ávidos y apasionados por la lectura. Ya sea que busques la última novela de tu autor favorito, material de estudio académico o historias cautivadoras para tus hijos, nuestra aplicación ofrece una experiencia de lectura conveniente y enriquecedora.
                    Descubre nuevos mundos, adquiere conocimientos, y sumérgete en historias cautivadoras, todo desde la comodidad de tu dispositivo móvil o computadora. Nuestra aplicación de biblioteca en línea te brinda la libertad de explorar, aprender y disfrutar de la lectura en cualquier momento y en cualquier lugar.
                </p>
                <Typography variant="h4" style={{ color: '#1976D2', fontWeight: '600', textAlign: 'left', paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px" }}>Características destacadas</Typography>

                <ul style={{ fontSize: '25px', color: '#000', paddingLeft: "50px", paddingRight: "50px" }}>
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