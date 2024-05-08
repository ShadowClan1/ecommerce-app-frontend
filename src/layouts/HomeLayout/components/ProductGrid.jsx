import React from "react";
import Box from '@mui/material/Box';
import products from "../../../data/products";
import Product from "./Product";

const ProductGrid = () => {
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
