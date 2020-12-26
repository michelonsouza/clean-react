import React, { InputHTMLAttributes, memo, useCallback } from 'react';

import classes from './styles.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ ...rest }, ref) => {
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>): void => {
      event.target.readOnly = false;
    },
    [],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>): void => {
      event.target.readOnly = true;
    },
    [],
  );

  return (
    <div className={classes.inputWrap}>
      <input
        className={classes.input}
        ref={ref}
        type="text"
        {...rest}
        readOnly
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span className={classes.status}>🔴</span>
    </div>
  );
});

export default memo(Input);
