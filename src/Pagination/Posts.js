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
        <Card sx={{ maxWidth: "23%", display: "inline-block", marginTop: "1.2%", marginLeft: "1.4%" }}>
          <CardMedia
            component="img"
            image="https://cdn.vatanbilgisayar.com/Upload/PRODUCT/huawei/thumb/130999-1_large.jpg"
            alt="green iguana"
            style={{ height: "50%", width: "50%", margin: "auto" }}
          />
          <CardContent  style={{padding:"1rem"}}>
            <Typography gutterBottom variant="h5" component="div" style={{ margin: "auto",marginBottom:"1rem" ,fontSize: "1.3rem" ,textOverflow:"ellipsis",maxHeight:"1.2rem"}}>
              Name:{post.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock:{post.stock}
            </Typography>
            <Typography variant="body2" style={{ marginTop: "2%", fontSize: "1.3rem" }}>
              <strong>Fiyat:{post.price} TL</strong>
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" style={{ width: "100%" }}>Sepete ekle</Button>
          </CardActions>
        </Card>
      ))}
    </>

  );
};

export default Posts;