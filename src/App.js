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
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from './features/goods/goodsSlice';
import { getImageUrl } from './api';

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
  },
  itemImage: {
    height: 100,
    width: 100,
    objectFit: 'contain',
  },
}));

function App({ initialDealers }) {
  const dispatch = useDispatch();

  const { goods, loading: goodsLoading } = useSelector(state => state.goods);
  useEffect(() => {
    dispatch(fetchGoods(initialDealers));
  }, [dispatch, initialDealers]);

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
            <IconButton color='inherit'>
              <ShoppingCartIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        <Box my={2}>
          {goods.map(item => {
            return (
              <Box mb={2} key={item.name}>
                <Card className={classes.card}>
                  <CardMedia
                    component='img'
                    alt={item.name}
                    className={classes.itemImage}
                    title={item.name}
                    image={getImageUrl(item.image)}
                  />
                  {/* <img alt={item.name} src={getImageUrl(item.image)} /> */}
                  <CardContent>
                    <Typography gutterBottom>{item.name}</Typography>
                    <Typography>{item.price}</Typography>
                  </CardContent>
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
