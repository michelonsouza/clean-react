import React, { ButtonHTMLAttributes } from 'react';

import Spinner from '../Spinner';

import classes from './styles.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ loading, children, ...rest }, ref) => {
  return (
    <button
      className={classes.button}
      ref={ref}
      type="button"
      {...rest}
      disabled={loading}
    >
      {loading ? (
        <Spinner className={classes['spinner-space']} />
      ) : (
        <>{children}</>
      )}
    </button>
  );
});

export default Button;
