import { SearchOff } from "@mui/icons-material";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard"
import "./Products.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = (props) => {
  
  const {enqueueSnackbar} = useSnackbar();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [search,setSearch] = useState();
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  useEffect(() => {
    setLoading(true);
    // call the API when the component mounts
    performAPICall();
  }, []);
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
   
    try{
      const response = await axios.get(`${config.endpoint}/products`);
      const products = response.data;
      setProducts(products);
      setLoading(false);
      console.log(products); 
    }catch(error){
      console.log("error");
      enqueueSnackbar("Something went wrong. Check the backend console for more details", { variant: "error" });
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    console.log(text);
    try{
      const response = await axios.get(`${config.endpoint}/products/search?value=${text}`);
      const products = response.data;
      setProducts(products);
      setLoading(false);
      console.log(products); 
    }catch(error){
      console.log("error");
      if(error.response.status===404){
        setProducts([]);   
        enqueueSnackbar("No products found",{ variant: "error" });
      }else{
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:"error"});
      }
      
    }
  };
  
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    console.log(debounceTimeout);
    const text = event.target.value;
    if(debounceTimeout){
      clearTimeout(debounceTimeout);
    }
    const timeOut = setTimeout(async()=>{
      await performSearch(text);
    },500)
    setDebounceTimeout(timeOut);
  };

  // const handleSearch = (e) => {
  //   performSearch(e.target.value);
  // };

  return (
    <div>
      <Header>
      <Box>
        <TextField 
          placeholder="Search for items/categories"
          className="search-desktop"
          value = {search}
          // onChange={(e)=>performSearch(e.target.value)}
          onChange ={(e) => {
            debounceSearch(e, debounceTimeout);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      </Header>
      <Box>
        <TextField 
          fullWidth 
          id="fullWidth" 
          placeholder="Search for items/categories"
          className="search-mobile"
          value = {search}
          // onChange={(e)=>performSearch(e.target.value)}
          onChange ={(e) => {
            debounceSearch(e, debounceTimeout);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
       <Grid container>
         <Grid item className="product-grid"  md={localStorage.getItem("token") ? 9 : 12}>
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
         {loading?(
          <Box className="loading">
              <CircularProgress size={25} color="primary"/>
              <p>Loading Products...</p>  
          </Box>
         ):(
          <div className="product-container">
          <Grid container marginY="1rem" paddingX="1rem" spacing={2} >
             {products.length?(
                products.map((product) => (
                  // console.log(product);
                  <Grid item key={product._id} xs={6} md={3}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ):(
                <Box className="loading"> 
                    <SentimentDissatisfied/>
                    <p>No products found</p>  
                </Box>
              )}
          </Grid> 
          </div>              
         )}
       </Grid>
      <Footer />
    </div>
  );
};

export default Products;
