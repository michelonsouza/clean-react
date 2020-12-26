import React, { InputHTMLAttributes, memo } from 'react';

import classes from './styles.scss';

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = React.forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...rest }, ref) => {
  return (
    <div className={classes.inputWrap}>
      <input className={classes.input} ref={ref} type="text" {...rest} />
      <span className={classes.status}>🔴</span>
    </div>
  );
});

export default memo(Input);
