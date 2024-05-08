import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { alpha } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  applyCopounThunk,
  removeItemFromCart,
  toggleCart,
} from "../../../redux/cartSlice";

const Cart = () => {
  const {
    open,
    items: cartContent,
    itemQuantity,
    taxRate,
    discountPrice,
    discountCopoun,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  // Calculate total amount
  const [items, setItems] = useState(
    cartContent.map((item) => ({
      ...item,
      quantity: itemQuantity[item?.id] ?? 1,
    }))
  );

  const [taxAmount, setTaxAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [copounCode, setCopounCode] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setItems(
      cartContent.map((item) => ({
        ...item,
        quantity: itemQuantity[item?.id] ?? 1,
      }))
    );
  }, [cartContent]);

  useEffect(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * itemQuantity[item.id],
      0
    );
    setSubtotal(subtotal);
    const taxAmount = subtotal * taxRate;
    setTaxAmount(taxAmount);
    const totalAmount = subtotal + taxAmount - discountPrice;
    setTotalAmount(totalAmount);
  }, [cartContent, itemQuantity, open, discountPrice]);


  const handleApplyCoupon = async () => {
    if(copounCode && copounCode.length > 1 ) await dispatch(applyCopounThunk({ copounCode }));
    else alert('enter a copoun to redeem coupon')
  };


  const increaseQuantity = (id) => {
    dispatch(addItemToCart({ id }));
  };

  const decreaseQuantity = (id) => {
    dispatch(removeItemFromCart({ id }));
  };

  const handleClose = () => {
    dispatch(toggleCart());
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Your Cart</DialogTitle>
      <DialogContent>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ marginRight: 10, width: 80, height: 80 }}
            />
            <Typography variant="body1" sx={{ fontSize: "14px" }}>
              {item.name}: ${item.price} x {itemQuantity[item.id]}
            </Typography>
            <IconButton
              color="primary"
              onClick={() => increaseQuantity(item.id)}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => decreaseQuantity(item.id)}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}

        {cartContent.length > 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="subtitle1">Subtotal: ${subtotal}</Typography>
              <Typography variant="subtitle1">
                Tax (18%): ${taxAmount}
              </Typography>
              {discountCopoun && (
                <Typography variant="subtitle1">
                  Discount: - ${discountPrice}
                </Typography>
              )}
              <Typography variant="subtitle1">
                Total Amount (Including Tax): ${totalAmount}
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <TextField
                label="Coupon Code"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setCopounCode(e.target.value);
                }}
                value={copounCode}
              />
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={handleApplyCoupon}
              >
                Apply Coupon
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          color="primary"
          variant="contained"
          disabled={cartContent.length === 0}
        >
          Proceed to Buy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
