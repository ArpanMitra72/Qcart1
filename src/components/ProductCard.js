import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { Box, TextField } from '@mui/material';
import React from "react";
import "./ProductCard.css";

// const data = {
//   "name":"Tan Leatherette Weekender Duffle",
//   "category":"Fashion",
//   "cost":150,
//   "rating":4,
//   "image":"https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
//   "_id":"PmInA797xJhMIPti"
//   }
const ProductCard = ({ product, handleAddToCart }) => {
  // console.log(product);
  return (
    <>
      <Card className = "card">
        <CardMedia
          component="img"
          image={product.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ${product.cost}
          </Typography>
          <Rating name="read-only" defaultValue={product.rating} precision={0.5} readOnly/>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" className="card-button" id={product._id}>
            <AddShoppingCartOutlined />
            ADD TO CART
          </Button>
        </CardActions>
      </Card>
      {/* <Card className="card">
        <CardMedia>
            <img src="https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png" alt="image-broked"/> 
        </CardMedia>
        <CardContent>       
          <Typography>
            {data.name}
          </Typography>
          <Typography>
            ${data.cost}
          </Typography>
          <Rating name="half-rating" defaultValue={data.rating} precision={0.5} />
        </CardContent>
        <Button variant="contained" className="card-button">
          <AddShoppingCartOutlined />
          ADD TO CART
        </Button>
      </Card> */}
    </>
    
  );
};

export default ProductCard;
