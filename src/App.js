import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { fetchProducts } from './features/products/productsSlice';
import ProductsPage from './features/products/ProductsPage';
import CartPage from './features/cart/CartPage';
import AppHeader from './components/AppHeader';

function App({ initialDealers }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(initialDealers));
  }, [dispatch, initialDealers]);

  return (
    <Router>
      <CssBaseline />
      <AppHeader />

      <Container>
        <Box my={2}>
          <Switch>
            <Route exact path='/'>
              <ProductsPage />
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

App.propTypes = {
  initialDealers: PropTypes.array,
};

export default App;
