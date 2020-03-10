import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import { fetchGoods } from './features/goods/goodsSlice';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import AppHeader from './components/AppHeader';

export const useStyles = makeStyles(theme => ({
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
    margin: theme.spacing(2),
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

  return (
    <Router>
      <CssBaseline />
      <AppHeader />

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
