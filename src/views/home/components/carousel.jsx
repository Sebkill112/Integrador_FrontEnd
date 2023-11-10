import React from "react";
import { Typography } from '@mui/material';
import Carousel from "react-material-ui-carousel";

export default function CarouselHome() {

    var items = [
        {            
            url: "https://imagenes.elpais.com/resizer/yKbXjIJcf_3MKIsXCjDrGhV819E=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/WEQBXMYURRCQRNA7LZA6XYMLZE.jpg"
        },
        {                        
            url: "https://www.telemundo.com/sites/nbcutelemundo/files/images/article/cover/2018/12/17/jovenes-en-biblioteca.jpg"
        },
        {                        
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Biblioteca-montserrat.jpg/1200px-Biblioteca-montserrat.jpg"
        },
        {                        
            url: "https://www.malagahoy.es/2020/03/12/malaga/Varias-personas-biblioteca-imagen-archivo_1445565963_118435023_1200x675.jpg"
        },
        {                        
            url: "https://www.thenewbarcelonapost.com/wp-content/uploads/2023/08/Interior-Biblioteca-Gabriel-Garcia-Marquez-Maria-Pratdesaba-ACN-1170x780.jpg"
        }
    ]
    return (
        <>
            <Carousel>
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
        </>
    )
}

function Item(props) {
    return (
        <div style={{ position: 'relative', marginTop: '0px' }}>            
            <img src={props.item.url} style={{ width: "100%", height: "750px" }} />
        </div>
    )
}

<Carousel
    next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
    prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
>
</Carousel>