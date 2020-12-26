import React, { HTMLAttributes, memo } from 'react';

import classes from './styles.scss';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'info';
}

const Spinner: React.FC<SpinnerProps> = ({ variant, className, ...rest }) => {
  return (
    <div className={`${classes.spinner} ${className || ''}`} {...rest}>
      <div
        className={`${classes.bounce1} ${variant ? classes[variant] : ''}`}
      />
      <div
        className={`${classes.bounce2} ${variant ? classes[variant] : ''}`}
      />
      <div className={variant ? classes[variant] : ''} />
    </div>
  );
};

export default memo(Spinner);
