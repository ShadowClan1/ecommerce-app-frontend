import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';

import productsDummy from '../../../data/products'

import Product from "./Product";
import { fetchProducts } from "../../../apis/apis";

const ProductGrid = () => {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    fecthProducts()
  },[])

  const fecthProducts = async () =>{
    const products = await fetchProducts();
    let data =[]
    if(products.data.data.length ===0 ) {
      data = productsDummy
    } else {
      data = products.data.data;
    }
    setProducts(data)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
      }}
    >
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default ProductGrid;
