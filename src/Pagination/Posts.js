import React, { useState, useEffect } from 'react';
import MediaCard from './Card';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { margin, width } from '@mui/system';
import { api } from '../Utilities/Api';

const Posts = ({ posts }) => {

  return (
    <>
      {posts.map(post => (

        <Card sx={{ display: "inline-block", marginTop: "1.2%", marginLeft: "1.4%" }}>
          <CardMedia
            component="img"
            src={
              post.productImageFile.map(element => {
                if (element.showCase) {
                  console.log(`http://127.0.0.1:8887/${element.path}`)
                  return (`http://127.0.0.1:8887/${element.path}`)
                }
              })
            }
            style={{ height: "15rem", width: "15rem", margin: "auto" }}
          />
          <CardContent style={{ padding: "1rem" }}>
            <Typography gutterBottom variant="h5" component="div" style={{ margin: "auto", marginBottom: "1rem", fontSize: "1rem", textOverflow: "ellipsis", maxHeight: "1.2rem" }}>
              Name:{post.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock:{post.stock}
            </Typography>
            <Typography variant="body2" style={{ marginTop: "2%", fontSize: "1rem" }}>
              <strong>Fiyat:{post.price} TL</strong>
            </Typography>
          </CardContent>
          <CardActions>



            <Button id={post.id} onClick={(event) => {

              let id = event.target.id

              var data = {
                productid: id,
                quantity: "1"
              }

              api("POST", "localhost", "7098", "baskets", "addbasketitem", null, data);

            }} variant="contained" style={{ width: "100%" }}>Sepete ekle</Button>
          </CardActions>
        </Card>
      ))
      }
    </>

  );
};

export default Posts;