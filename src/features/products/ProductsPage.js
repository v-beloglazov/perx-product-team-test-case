import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { CircularProgress, Typography } from '@material-ui/core';
import ProductCard from './ProductCard';

function ProductsPage() {
  const { products, loading: productsLoading } = useSelector(
    state => state.products
  );

  if (productsLoading) {
    return <CircularProgress />;
  }

  const productList = products.map(({ name, price, image }) => {
    return (
      <Box m={2} key={name}>
        <ProductCard name={name} price={price} imagePath={image} />
      </Box>
    );
  });

  return (
    <>
      <Typography variant='h2'>Products</Typography>
      {productList}
    </>
  );
}

export default ProductsPage;
