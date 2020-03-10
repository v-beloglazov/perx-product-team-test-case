import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
} from '../features/cart/cartSlice';
import CountControls from './CountControls';

const useStyles = makeStyles(theme => ({
  secondaryAction: {
    marginLeft: theme.spacing(2),
  },
}));

function CartItem({ name }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { goods } = useSelector(state => state.goods);
  const { itemsCountByName } = useSelector(state => state.cart);

  const item = goods.find(item => item.name === name);
  if (!item) {
    return null;
  }

  const { price } = item;
  const itemCount = itemsCountByName[name];
  const totalPrice = (price * itemCount).toFixed(2);

  const handleAdd = () => dispatch(addToCart(name));
  const handleRemove = () => dispatch(removeFromCart(name));
  const handleDelete = () => dispatch(deleteFromCart(name));

  return (
    <ListItem key={name} alignItems='center' divider>
      <ListItemText
        primary={name}
        secondary={
          <>
            ${price} x {itemCount} = ${totalPrice}
          </>
        }
      />
      <CountControls
        onAdd={handleAdd}
        onRemove={handleRemove}
        count={itemCount}
      />
      <ListItemSecondaryAction className={classes.secondaryAction}>
        <IconButton edge='end' aria-label='delete' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default CartItem;
