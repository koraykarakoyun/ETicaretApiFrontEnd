import React from 'react'
import { useEffect } from 'react'
import homeimage from "../../Image/homeimage.png"
import { api } from '../../Utilities/Api'
import { useState } from 'react'
import Carousel from 'better-react-carousel'

const ImageSliderCarousel = () => {


    const [image, setImage] = useState([]);

    useEffect(() => {

        api("GET", "localhost", "7098", "products", "getallimage", null, null).then(res => setImage(res));

    }, [])




    return (
        <>
            <Carousel loop>
                {
                    image.map(element => (
                        <Carousel.Item > 
                            <img style={{width:"100%",maxHeight:"40rem"}} src={`http://127.0.0.1:8887/${element.path}`} />
                        </Carousel.Item>
                    ))
                }


            </Carousel>
        </>
    )
}

export default ImageSliderCarousel