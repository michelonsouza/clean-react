import React, { InputHTMLAttributes, memo } from 'react';

import classes from './styles.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ ...rest }, ref) => {
  return (
    <div className={classes.inputWrap}>
      <input className={classes.input} ref={ref} type="text" {...rest} />
      <span className={classes.status}>🔴</span>
    </div>
  );
});

export default memo(Input);
