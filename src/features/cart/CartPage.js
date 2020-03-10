import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, List, makeStyles } from '@material-ui/core';
import { clearCart } from './cartSlice';
import CartItem from './CartItem';

const useStyles = makeStyles(() => ({
  cartHeader: {
    display: 'flex',
  },
  cartTitle: {
    flexGrow: 1,
  },
  clearCartButton: {
    alignSelf: 'flex-end',
  },
}));

const getTotalAmount = (cartItems, products, itemsCountByName) =>
  cartItems.reduce((acc, name) => {
    const item = products.find(item => item.name === name);
    if (!item) {
      return acc;
    }
    const { price } = item;
    const itemCount = itemsCountByName[item.name];
    const totalPrice = price * itemCount;
    const newAcc = acc + totalPrice;
    return newAcc;
  }, 0);

function CartPage() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { items: cartItems, itemsCountByName } = useSelector(
    state => state.cart
  );
  const { products } = useSelector(state => state.products);

  const hasItemsInCart = cartItems.length !== 0;

  const totalAmount = getTotalAmount(
    cartItems,
    products,
    itemsCountByName
  ).toFixed(2);

  const handleClear = () => dispatch(clearCart());

  let cartContent;

  if (hasItemsInCart) {
    cartContent = (
      <>
        <List>
          {cartItems.map(name => (
            <CartItem key={name} name={name} />
          ))}
        </List>
        <Box mx={2}>
          <Typography variant='subtitle1'>Total amount:</Typography>
          <Typography variant='h6'>${totalAmount}</Typography>
        </Box>
      </>
    );
  } else {
    cartContent = (
      <Box mt={2} ml={2}>
        <Typography>
          No items in cart. You can add it at <Link to='/'>home page</Link>
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <div className={classes.cartHeader}>
        <Typography className={classes.cartTitle} variant='h2'>
          Cart
        </Typography>
        {hasItemsInCart && (
          <Button
            className={classes.clearCartButton}
            color='secondary'
            onClick={handleClear}
          >
            Clear cart
          </Button>
        )}
      </div>
      {cartContent}
    </>
  );
}

export default CartPage;
