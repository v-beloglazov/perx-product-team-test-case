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
  clearCart,
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
  cardContentWrapper: {
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
  itemCount: {
    margin: '0 0.5em',
  },
  addButton: {
    margin: '0',
  },
  actionsWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    height: '68px',
  },
}));

function App({ initialDealers }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoods(initialDealers));
  }, [dispatch, initialDealers]);

  const { totalCount } = useSelector(state => state.cart);

  const classes = useStyles();

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

function CountControls({ onAdd, onRemove, count = 0 }) {
  const classes = useStyles();

  return (
    <>
      <IconButton aria-label='reduce' onClick={onRemove} size='small'>
        <RemoveIcon />
      </IconButton>
      <Typography className={classes.itemCount}>{count}</Typography>
      <IconButton
        className={classes.addButton}
        aria-label='increase'
        onClick={onAdd}
        size='small'
      >
        <AddIcon />
      </IconButton>
    </>
  );
}

function ProductCard({ name, imagePath, price = 0 }) {
  const dispatch = useDispatch();
  const { items: cartItems, itemsCountByName } = useSelector(
    state => state.cart
  );
  const itemInCart = cartItems.includes(name);
  const itemCount = itemsCountByName[name];
  const handleAdd = () => dispatch(addToCart(name));
  const handleRemove = () => dispatch(removeFromCart(name));

  const classes = useStyles();

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

function HomePage() {
  const { loading: goodsLoading } = useSelector(state => state.goods);

  const { goods } = useSelector(state => state.goods);
  if (goodsLoading) {
    return <CircularProgress />;
  }
  const productList = goods.map(({ name, price, image }) => {
    return (
      <Box mb={2} key={name}>
        <ProductCard name={name} price={price} imagePath={image} />
      </Box>
    );
  });

  return productList;
}

function CartPage() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { items: cartItems, itemsCountByName } = useSelector(
    state => state.cart
  );
  const hasItemsInCart = cartItems.length !== 0;

  const { goods } = useSelector(state => state.goods);

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

  const handleClear = () => dispatch(clearCart());

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
      {!hasItemsInCart && (
        <Box mt={2} ml={2}>
          <Typography>
            No items in cart. You can add it at <Link to='/'>home page</Link>
          </Typography>
        </Box>
      )}
      {hasItemsInCart && (
        <>
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
                  <IconButton
                    aria-label='reduce'
                    size='small'
                    onClick={handleRemove}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography className={classes.itemCount}>
                    {itemCount}
                  </Typography>
                  <IconButton
                    aria-label='increase'
                    size='small'
                    onClick={handleAdd}
                  >
                    <AddIcon />
                  </IconButton>
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
          <Box mx={2}>
            <Typography variant='subtitle1'>Total amount:</Typography>
            <Typography variant='h6'>${totalAmount}</Typography>
          </Box>
        </>
      )}
    </>
  );
}
