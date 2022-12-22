import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { api } from '../../Utilities/Api';
import Carousel from 'better-react-carousel'
import Button from '@mui/material/Button';
import "./ProductDetail.css"
const divMargin = {
    marginLeft: "5%",
    marginRight: "5%",
    border: "1px solid black"

}

const divAbsolute = {
    display: "inline-block",
    position: "absolute",
}

const ProductDetail = (props) => {

    let { id } = useParams();
    const [posts, setPosts] = useState({ success: false, data: [] });
    const [images, setImages] = useState([]);

    useEffect(() => {

        api("GET", "localhost", "7098", "products", "getbyid", id, null).then((data) => {
            setPosts({ success: true, data: data });
            console.log(data);
        });
        api("GET", "localhost", "7098", "products", "getbyidproductallimages", id, null).then((data) => {
            setImages(data);
            console.log(data);
        });


    }, [id])



    return (

        posts.success ? (
            <div style={divMargin}>
                <div style={{ width: "50%", height: "40rem", display: "inline-block" }}>
                    <Carousel loop>
                        {
                            images.map(element => (
                                <Carousel.Item >
                                    <img style={{ width: "100%", height: "40rem" }} src={`http://127.0.0.1:8887/${element.filePath}`} />
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </div>
                <div style={{
                    display: "inline-block",
                    position: "absolute",
                    top: "12rem",
                    fontSize: "1.5rem"

                }} class={divAbsolute}>
                    {posts.data.productName}
                </div>

                <div style={{
                    display: "inline-block",
                    position: "absolute",
                    top: "14rem",

                }} className={divAbsolute}>
                    {posts.data.productBrand.toUpperCase()}
                </div>

                <div style={{
                    display: "inline-block",
                    position: "absolute",
                    top: "16rem",

                }} className={divAbsolute}>
                    {posts.data.productModel.toUpperCase()}
                </div>

                <div style={{
                    display: "inline-block",
                    position: "absolute",
                    top: "18rem",
                    fontSize: "1.3rem"

                }} className={divAbsolute}>
                    {posts.data.productPrice} TL
                </div>
                <div style={{
                    display: "inline-block",
                    position: "absolute",
                    top: "20rem",
                    fontSize: "1.2rem"
                }} className={divAbsolute}>
                    Stok Sayısı : {posts.data.productStock} Adet
                </div>

                <div style={{
                    display: "inline-block",
                    position: "absolute",
                    top: "22rem",
                    fontSize: "1.2rem"
                }} className={divAbsolute}>
                    Renk : {posts.data.productColor}
                </div>

                <div style={{
                    display: "inline-block",
                    position: "absolute",
                    top: "24.5rem",
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

                    api("POST", "localhost", "7098", "baskets", "addbasketitem", null, data).then(res => console.log(res));

                }} variant="contained" style={{
                    width: "10%",
                    display: "inline-block",
                    position: "absolute",
                    top: "27rem",
                }}>Sepete ekle</Button>







                <div style={{
                    display: "inline-block",
                    position: "absolute",
                    top: "30rem",
                    fontSize: "1.2rem"
                }} className={divAbsolute}>
                    Açıklama : {posts.data.productDescription}
                </div>
            </div >) : (null)
    )
}

export default ProductDetail