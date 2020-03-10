import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  makeStyles,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { getImageUrl } from '../../api';
import { addToCart, removeFromCart } from '../cart/cartSlice';
import CountControls from '../../components/CountControls';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '350px',
  },
  cardContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemImage: {
    height: 100,
    width: 100,
    objectFit: 'contain',
    margin: theme.spacing(2),
  },

  actionsWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    height: '68px',
  },
}));

function ProductCard({ name, imagePath, price = 0 }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { items: cartItems, itemsCountByName } = useSelector(
    state => state.cart
  );

  const itemInCart = cartItems.includes(name);
  const itemCount = itemsCountByName[name];

  const handleAdd = () => dispatch(addToCart(name));
  const handleRemove = () => dispatch(removeFromCart(name));

  if (!name) {
    return null;
  }

  return (
    <Card className={classes.card} variant='outlined'>
      <CardMedia
        component='img'
        alt={name}
        title={name}
        className={classes.itemImage}
        image={getImageUrl(imagePath)}
      />
      <div className={classes.cardContentWrapper}>
        <CardContent>
          <Typography gutterBottom variant='h6'>
            {name}
          </Typography>
          <Typography>${price.toFixed(2)}</Typography>
        </CardContent>
        <div className={classes.actionsWrapper}>
          {!itemInCart && (
            <Button onClick={handleAdd} startIcon={<AddShoppingCartIcon />}>
              Add to cart
            </Button>
          )}
          {itemInCart && (
            <CountControls
              count={itemCount}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          )}
        </div>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
