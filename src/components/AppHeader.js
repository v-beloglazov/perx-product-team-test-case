import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton, Badge, makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    color: 'inherit',
    textDecoration: 'none',
  },
}));

function AppHeader() {
  const { totalCount } = useSelector(state => state.cart);
  const classes = useStyles();

  return (
    <>
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
          <IconButton color='inherit' title='Cart' component={Link} to='/cart'>
            <Badge badgeContent={totalCount} color='secondary'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default AppHeader;
