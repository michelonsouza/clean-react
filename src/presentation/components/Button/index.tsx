import React, { ButtonHTMLAttributes, memo } from 'react';

import Spinner from '../Spinner';

import classes from './styles.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ loading, children, disabled, ...rest }, ref) => {
  return (
    <button
      data-testid="button"
      className={classes.button}
      ref={ref}
      type="button"
      {...rest}
      disabled={disabled || loading}
    >
      {loading ? (
        <Spinner
          data-testid="spinner-loading"
          className={classes['spinner-space']}
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
});

export default memo(Button);
