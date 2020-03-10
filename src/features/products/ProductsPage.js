import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography, makeStyles } from '@material-ui/core';
import ProductCard from './ProductCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
}));

function ProductsPage() {
  const classes = useStyles();

  const { products, loading: productsLoading } = useSelector(
    state => state.products
  );

  if (productsLoading) {
    return <CircularProgress />;
  }

  const productList = (
    <div className={classes.root}>
      {products.map(({ name, price, image }) => {
        return (
          <ProductCard name={name} price={price} imagePath={image} key={name} />
        );
      })}
    </div>
  );

  return (
    <>
      <Typography variant='h2'>Products</Typography>
      {productList}
    </>
  );
}

export default ProductsPage;
