import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {
  makeStyles,
  IconButton,
  Card,
  CardMedia,
  CircularProgress,
  CardContent,
  CardActions,
  Button,
  Badge,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from './features/goods/goodsSlice';
import { getImageUrl } from './api';
import { addToCart, removeFromCart } from './features/cart/cartSlice';

function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '350px',
  },
  cartContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemImage: {
    height: 100,
    width: 100,
    objectFit: 'contain',
    margin: '5px',
  },
}));

function App({ initialDealers }) {
  const dispatch = useDispatch();

  const { goods, loading: goodsLoading } = useSelector(state => state.goods);
  useEffect(() => {
    dispatch(fetchGoods(initialDealers));
  }, [dispatch, initialDealers]);

  const { items: cartItems, itemsCountByName, totalCount } = useSelector(
    state => state.cart
  );

  const classes = useStyles();

  if (goodsLoading) {
    return <CircularProgress />;
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              eShop
            </Typography>
            <IconButton color='inherit' title="Cart">
              <Badge badgeContent={totalCount} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        <Box my={2}>
          {goods.map(item => {
            const itemInCart = cartItems.includes(item.name);
            const itemCount = itemsCountByName[item.name];

            const handleAdd = () => dispatch(addToCart(item.name));
            const handleRemove = () => dispatch(removeFromCart(item.name));

            return (
              <Box mb={2} key={item.name}>
                <Card className={classes.card} variant='outlined'>
                  <CardMedia
                    component='img'
                    alt={item.name}
                    className={classes.itemImage}
                    title={item.name}
                    image={getImageUrl(item.image)}
                  />
                  <div className={classes.cartContentWrapper}>
                    <CardContent>
                      <Typography gutterBottom variant='h6'>
                        {item.name}
                      </Typography>
                      <Typography>${item.price}</Typography>
                    </CardContent>
                    <CardActions>
                      {!itemInCart && (
                        <Button onClick={handleAdd} startIcon={<AddShoppingCartIcon />}>Add to cart</Button>
                      )}
                      {itemInCart && (
                        <>
                          <Button aria-label='reduce' onClick={handleRemove}>
                            <RemoveIcon />
                          </Button>
                          <Typography>{itemCount}</Typography>
                          <Button aria-label='increase' onClick={handleAdd}>
                            <AddIcon />
                          </Button>
                        </>
                      )}
                    </CardActions>
                  </div>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
