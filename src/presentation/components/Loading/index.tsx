import React from 'react';

import classes from './styles.scss';

interface LoadingProps {
  variant?: 'primary' | 'secondary' | 'info';
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ variant, className }) => {
  return (
    <div className={`${classes.spinner} ${className || ''}`}>
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

export default Loading;
