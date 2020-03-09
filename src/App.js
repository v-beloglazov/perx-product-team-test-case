import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from './features/goods/goodsSlice';
import { getImageUrl } from './api';
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
} from './features/cart/cartSlice';

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

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    color: 'inherit',
    textDecoration: 'none',
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

function App({ initialDealers }) {
  const dispatch = useDispatch();

  const { loading: goodsLoading } = useSelector(state => state.goods);
  useEffect(() => {
    dispatch(fetchGoods(initialDealers));
  }, [dispatch, initialDealers]);

  const { totalCount } = useSelector(state => state.cart);

  const classes = useStyles();

  if (goodsLoading) {
    return <CircularProgress />;
  }
  return (
    <Router>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Typography
              variant='h6'
              component={Link}
              to='/'
              className={classes.title}
            >
              eShop
            </Typography>
            <IconButton
              color='inherit'
              title='Cart'
              component={Link}
              to='/cart'
            >
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
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path='/cart'>
              <CartPage />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default App;

function HomePage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { goods } = useSelector(state => state.goods);
  const { items: cartItems, itemsCountByName } = useSelector(
    state => state.cart
  );

  return goods.map(item => {
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
                <Button onClick={handleAdd} startIcon={<AddShoppingCartIcon />}>
                  Add to cart
                </Button>
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
  });
}

function CartPage() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { items: cartItems, itemsCountByName } = useSelector(
    state => state.cart
  );
  const { goods } = useSelector(state => state.goods);

  if (cartItems.length === 0) {
    return (
      <Typography>
        No items in cart. You can add it at <Link to='/'>home page</Link>
      </Typography>
    );
  }

  const totalAmount = cartItems
    .reduce((acc, name) => {
      const item = goods.find(item => item.name === name);
      const { price } = item;
      const itemCount = itemsCountByName[item.name];
      const totalPrice = price * itemCount;
      const newAcc = acc + totalPrice;
      return newAcc;
    }, 0)
    .toFixed(2);

  return (
    <>
      <div className={classes.cartHeader}>
        <Typography className={classes.cartTitle} variant='h2'>
          Cart
        </Typography>
        <Button className={classes.clearCartButton} color='secondary'>
          Clear cart
        </Button>
      </div>
      <List>
        {cartItems.map(name => {
          const item = goods.find(item => item.name === name);
          const { price } = item;
          const itemCount = itemsCountByName[item.name];
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
                    ${item.price} x {itemCount} = ${totalPrice}
                  </>
                }
              />
              <Button aria-label='reduce' onClick={handleRemove}>
                <RemoveIcon />
              </Button>
              <Typography>{itemCount}</Typography>
              <Button aria-label='increase' onClick={handleAdd}>
                <AddIcon />
              </Button>
              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      Total amount:
      <Typography>${totalAmount}</Typography>
    </>
  );
}
