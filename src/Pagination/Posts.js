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
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Posts = ({ posts }) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>

        {
          posts.map((post, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>

              <Card>
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
                  style={{height:"15rem", width: "100%",objectFit:"fill"}}
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

            </Grid >
          ))
        }
      </Grid>
    </Box>
  );
};

export default Posts;