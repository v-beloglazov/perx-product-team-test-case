import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  itemCount: {
    margin: '0 0.5em',
  },
  addButton: {
    margin: '0',
  },
}));

function CountControls({ onAdd, onRemove, count = 0 }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
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
    </div>
  );
}

CountControls.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default CountControls;
