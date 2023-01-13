import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { margin, width } from '@mui/system';
import { api } from '../../Utilities/Api';
import Radio from '@mui/material/Radio';
import { LegendToggle } from '@mui/icons-material';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { useAlert } from 'react-alert'
import { types } from 'react-alert'
const FileUploadPosts = (props) => {
    const alert = useAlert()
    const [posts, setPosts] = useState([]);
    const [productid, setproductid] = useState();
    const [imageid, setimageid] = useState();
    const [IsConfirm, setIsConfirm] = useState();

    const handleChange = (event) => {


        setproductid(props.productId)
        setimageid(event.target.value)

    }

    useEffect(() => {
        api("GET", "localhost", "7098", "products", "GetImage", props.productId, null).then((data) => {
            setPosts(data);
            console.log(data);
        });
    }, [FileUploadPosts])




    return (
        <>
            {posts.map(post => (



                <Card style={{ height: "10rem", width: "10rem", display: "inline-block",marginLeft:"auto",marginRight:"auto" }}>
                    <input type="radio" value={post.productId} name='img' onClick={handleChange}></input>
                    <CardMedia
                        component="img"
                        src={"http://127.0.0.1:8887/" + post.productPath}
                        style={{ height: "100%", width: "100%", margin: "auto" ,backgroundPosition:"center"}}
                    />
                </Card>


            ))}

            <div>
                <ConfirmDialog DialogTitle="Dikkat" DialogContent="Seçilen Resmi Vitrine Koymak İstiyor Musunuz?" Button1="Seçimi Onayla" Button2="İptal" Dia buttonName="Vitrini Onayla" apifunction={() => {
                    var data = {
                        "ProductId": String(productid),
                        "ImageId": String(imageid)
                    }

                    api("PUT", "localhost", "7098", "products", "vitrin", null, data).then((res) => {

                         if (res.isSuccess) {
                            alert.show(res.message, { type: types.SUCCESS })
                        }
                        else {
                            alert.show(res.message, { type: types.SUCCESS })
                        }

                    });
                }}></ConfirmDialog>
            </div>

        </>

    );
};

export default FileUploadPosts;