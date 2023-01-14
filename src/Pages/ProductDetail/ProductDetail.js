import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { api } from '../../Utilities/Api';
import Carousel from 'better-react-carousel'
import Button from '@mui/material/Button';
import "./ProductDetail.css"
import Footer from '../../Components/Footer/Footer';
import { useAlert } from 'react-alert'
import { types } from 'react-alert'
const divMargin = {
    marginLeft: "20%",
    marginRight: "20%",
    border: "2px solid #E5E5E5",
    minHeight: "50rem",
    borderRadius: "10px",
    marginTop: "1%",
    marginBottom: "1%",
}

const ProductDetail = (props) => {
    const alert = useAlert()
    let { id } = useParams();
    const [posts, setPosts] = useState({ success: false, data: [] });
    const [images, setImages] = useState([]);

    useEffect(() => {

        api("GET", "localhost", "7098", "products", "getbyid", id, null).then((data) => {
            setPosts({ success: true, data: data });

        });
        api("GET", "localhost", "7098", "products", "getbyidproductallimages", id, null).then((data) => {
            setImages(data);

        });


    }, [id])



    return (

        posts.success ? (
            <>
                <div style={divMargin}>

                    <div style={{ width: "50%", minHeight: "40rem", display: "inline-block", borderTopLeftRadius: "10px" }}>
                        <Carousel loop>
                            {
                                images.map(element => (
                                    <Carousel.Item >
                                        <img style={{ width: "100%", height: "40rem", borderTopLeftRadius: "10px" }} src={`http://127.0.0.1:8887/${element.filePath}`} />
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>



                    </div>

                    <div style={{ width: "50%", minHeight: "40rem", display: "inline-block", backgroundColor: "#F5F5F5", borderTopRightRadius: "10px" }}>

                        <div style={{
                            display: "inline-block",
                            position: "absolute",
                            top: "12rem",
                            fontSize: "1.5rem",
                            left: "51%"

                        }}>
                            {posts.data.productName}
                        </div>

                        <div style={{
                            display: "inline-block",
                            position: "absolute",
                            top: "14rem",
                            left: "51%"

                        }} >
                            {posts.data.productBrand.toUpperCase()}
                        </div>

                        <div style={{
                            display: "inline-block",
                            position: "absolute",
                            top: "16rem",
                            left: "51%"

                        }} >
                            {posts.data.productModel.toUpperCase()}
                        </div>

                        <div style={{
                            display: "inline-block",
                            position: "absolute",
                            top: "18rem",
                            fontSize: "1.3rem",
                            left: "51%"

                        }}>
                            {posts.data.productPrice} TL
                        </div>
                        <div style={{
                            display: "inline-block",
                            position: "absolute",
                            top: "20rem",
                            fontSize: "1.2rem",
                            left: "51%"
                        }}>
                            Stok Sayısı : {posts.data.productStock} Adet
                        </div>

                        <div style={{
                            display: "inline-block",
                            position: "absolute",
                            top: "22rem",
                            fontSize: "1.2rem",
                            left: "51%"
                        }}>
                            Renk : {posts.data.productColor}
                        </div>

                        <div style={{
                            display: "inline-block",
                            position: "absolute",
                            top: "24.5rem",
                            left: "51%"
                        }} >

                            <div class="quantity">

                                <button class="btn minus1" onClick={() => {
                                    if (document.getElementById("id_form-0-quantity").value > 1) {
                                        document.getElementById("id_form-0-quantity").value = Number(document.getElementById("id_form-0-quantity").value) - Number(1);
                                    }
                                }}>-</button>
                                <input class="quantity" id="id_form-0-quantity" disabled min="0" name="form-0-quantity" defaultValue="1" type="number" />
                                <button class="btn add1" onClick={() => {
                                    document.getElementById("id_form-0-quantity").value = Number(document.getElementById("id_form-0-quantity").value) + Number(1);
                                }}>+</button>
                            </div>
                        </div>

                        <Button id={posts.data.productId} onClick={(event) => {

                            let id = event.target.id

                            var data = {
                                productid: id,
                                quantity: document.getElementById("id_form-0-quantity").value
                            }

                            api("POST", "localhost", "7098", "baskets", "addbasketitem", null, data).then(res => {
                                if (res.isSuccess) {
                                    alert.show(res.message, { type: types.SUCCESS })
                                }
                                else {
                                    alert.show(res.message, { type: types.ERROR })
                                }
                            }
                            );

                        }} variant="contained" size='large' style={{
                            width: "10%",
                            display: "inline-block",
                            position: "absolute",
                            top: "27rem",
                            left: "51%"
                        }}>Sepete ekle</Button>







                        <div style={{
                            display: "inline-block",
                            position: "absolute",
                            top: "32rem",
                            fontSize: "1.2rem",
                            left: "51%"
                        }}>
                            Açıklama : {posts.data.productDescription}
                        </div>
                    </div >


                    <div style={{ width: "50%", minHeight: "10rem", display: "inline-block" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {

                                images.map(element => (
                                    <Carousel.Item>
                                        <img style={{ width: "20%", height: "5rem", margin: "3%" }} src={`http://127.0.0.1:8887/${element.filePath}`} />
                                    </Carousel.Item>
                                ))

                            }
                        </div>
                    </div>

                </div>
                <Footer></Footer>
            </>
        ) : (null)
    )
}

export default ProductDetail