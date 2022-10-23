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

const FileUploadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [productid, setproductid] = useState();
    const [imageid, setimageid] = useState();
    const [IsConfirm, setIsConfirm] = useState();

    const handleChange = (event) => {
        setproductid(props.productId)
        setimageid(event.target.value)
    }

    useEffect(() => {
        console.log(props.productId);
        api("GET", "localhost", "7098", "products", "GetImage", props.productId, null).then((data) => {

            setPosts(data);
            console.log(data);
        });

    }, [FileUploadPosts])

    if (IsConfirm) {

        var data = {
            "productid": String(productid),
            "imageid": String(imageid)
        }

        api("PUT", "localhost", "7098", "products", "vitrin", null, data).then((res) => {
            console.log(res);

        });
    }


    return (
        <>
            {posts.map(post => (
                <Card sx={{ maxWidth: "23%", display: "inline-block", marginTop: "1.2%", marginLeft: "1.4%" }}>

                    <input type="radio" value={post.id} name='img' onClick={handleChange}></input>
                    <CardMedia
                        component="img"
                        src={"http://127.0.0.1:8887/" + post.path}
                        style={{ height: "100%", width: "100%", margin: "auto" }}
                    />

                </Card>
            ))}
            <div>
                <ConfirmDialog buttonName="Vitrini Onayla" setIsConfirm={setIsConfirm}></ConfirmDialog>
            </div>

        </>

    );
};

export default FileUploadPosts;