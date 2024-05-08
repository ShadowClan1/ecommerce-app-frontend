import React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../redux/cartSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (id, product) =>{
    dispatch(addItemToCart({id : id, item : product}))
  }
  return (
    <Box
      id="product-card"
      sx={(theme) => ({
        mt: { xs: 8, sm: 10 },
        alignSelf: 'center',
        maxWidth: '400px',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        outline: '1px solid',
        outlineColor:
          theme.palette.mode === 'light'
            ? alpha('#BFCCD9', 0.5)
            : alpha('#9CCCFC', 0.1),
        padding: theme.spacing(2),
      })}
    >
      <Box
        id="image"
        sx={(theme) => ({
          height: '200px',
          backgroundImage: `url(${product.image})`,
          backgroundSize: 'cover',
          borderRadius: '10px',
        })}
      />
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {product.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: ${(product.price)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={()=>{handleAddToCart(product.id, product)}}>
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
