import React from 'react';
import MediaCard from './Card';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { margin, width } from '@mui/system';
const Posts = ({ posts }) => {
  return (
    <>
      {posts.map(post => (
        <Card sx={{ maxWidth: "15%", display: "inline-block", marginTop: "1.2%", marginLeft: "1.4%" }}>
          <CardMedia
            component="img"
            image="https://cdn.vatanbilgisayar.com/Upload/PRODUCT/huawei/thumb/130999-1_large.jpg"
            alt="green iguana"
            style={{ height: "50%", width: "50%", margin: "auto" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ margin: "auto" }}>
              {post.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae obcaecati quis architecto reprehenderit ex qui, quisquam eaque beatae ducimus asperiores, debitis repellendus eum voluptate eligendi? Error autem dolorem dolorum <quaerat className=""></quaerat>
            </Typography>
            <Typography variant="body2" style={{ marginTop: "2%", fontSize: "1.3rem" }}>
              <strong>10.00TL</strong>
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