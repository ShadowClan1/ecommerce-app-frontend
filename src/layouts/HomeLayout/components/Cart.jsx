import React, { useState } from "react";
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
import { toggleCart } from "../../../redux/cartSlice";

const Cart = () => {
  const { open, items: cartContent } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // Calculate total amount
  const [items, setItems] = useState(
    cartContent.map((item) => ({ ...item, quantity: 1 }))
  );
  const [discountCopoun, setDiscountCopoun] = useState({
    applied: false,
    amount: 0,
  });
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxRate = 0.18; // 18% tax rate
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  const discount = 40;

  // Function to handle applying coupon
  const handleApplyCoupon = () => {
    // Implement coupon logic here
    alert("Coupon applied!");
  };

  // Function to increase quantity
  const increaseQuantity = (index) => {
    const newItems = [...items];
    newItems[index].quantity += 1;
    setItems(newItems);
  };

  // Function to decrease quantity
  const decreaseQuantity = (index) => {
    const newItems = [...items];
    if (newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
      setItems(newItems);
    }
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
              {item.name}: ${item.price} x {item.quantity}
            </Typography>
            <IconButton color="primary" onClick={() => increaseQuantity(index)}>
              <AddIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => decreaseQuantity(index)}>
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}

        {(cartContent.length >
          0 ) && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {discountCopoun.applied && (
                  <Typography variant="subtitle1">
                    Discount: ${discountCopoun?.amount}
                  </Typography>
                )}
                <Typography variant="subtitle1">
                  Subtotal: ${subtotal}
                </Typography>
                <Typography variant="subtitle1">
                  Tax (18%): ${taxAmount}
                </Typography>
                <Typography variant="subtitle1">
                  Total Amount (Including Tax): ${totalAmount}
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <TextField label="Coupon Code" variant="outlined" fullWidth />
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
        <Button color="primary" variant="contained" disabled={(cartContent.length ===0 )}>
          Proceed to Buy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
