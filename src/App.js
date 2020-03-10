import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { fetchGoods } from './features/goods/goodsSlice';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import AppHeader from './components/AppHeader';

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

App.propTypes = {
  initialDealers: PropTypes.array,
};

export default App;
