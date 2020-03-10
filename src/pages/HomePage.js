import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { CircularProgress, Typography } from '@material-ui/core';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const { loading: goodsLoading } = useSelector(state => state.goods);
  const { goods } = useSelector(state => state.goods);

  if (goodsLoading) {
    return <CircularProgress />;
  }

  const productList = goods.map(({ name, price, image }) => {
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

export default HomePage;
