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
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import classNames from 'classnames';
import { getImageUrl } from '../../api';
import { addToCart, removeFromCart } from '../cart/cartSlice';
import CountControls from '../../components/CountControls';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '300px',
    flexBasis: '300px',
    margin: theme.spacing(1),
  },
  xsCard: {
    flexDirection: 'column',
  },
  cardContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  xsCardContentWrapper: {
    alignSelf: 'flex-start',
  },
  itemImage: {
    height: 100,
    width: 100,
    objectFit: 'contain',
    margin: theme.spacing(2),
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    minHeight: '68px',
  },
  viewInCartButton: {
    marginTop: theme.spacing(1),
  },
}));

function ProductCard({ name, imagePath, price = 0 }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down('xs'));

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

  const cardClass = classNames({
    [classes.card]: true,
    [classes.xsCard]: xsScreen,
  });

  const cardContentWrapperClass = classNames({
    [classes.cardContentWrapper]: true,
    [classes.xsCardContentWrapper]: xsScreen,
  });

  return (
    <Card className={cardClass} variant='outlined'>
      <CardMedia
        component='img'
        alt={name}
        title={name}
        className={classes.itemImage}
        image={getImageUrl(imagePath)}
      />
      <div className={cardContentWrapperClass}>
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
            <>
              <CountControls
                count={itemCount}
                onAdd={handleAdd}
                onRemove={handleRemove}
              />
              <Button
                className={classes.viewInCartButton}
                variant='outlined'
                component={Link}
                to='/cart'
              >
                View in cart
              </Button>
            </>
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
