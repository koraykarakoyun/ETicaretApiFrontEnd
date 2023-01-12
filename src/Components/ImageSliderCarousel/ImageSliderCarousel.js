import React from 'react'
import { useEffect } from 'react'
import { api } from '../../Utilities/Api'
import { useState } from 'react'
import Carousel from 'better-react-carousel'

const ImageSliderCarousel = () => {


    const [image, setImage] = useState([]);

    useEffect(() => {

        api("GET", "localhost", "7098", "sliders", "getallslidephoto", true, null).then((res) => {
            console.log(res);
            setImage(res)
        }
        );
    }, [])
    return (
        <>
            <Carousel loop>
                {
                    image.map(element => (
                        <Carousel.Item>
                            <img style={{ width: "100%", maxHeight: "35rem" }} src={`http://127.0.0.1:8887/${element.filePath}`} />
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </>
    )
}

export default ImageSliderCarousel