import React, { HTMLAttributes, memo } from 'react';

import classes from './styles.scss';

type FormStatusProps = HTMLAttributes<HTMLDivElement>;

const FormStatus: React.FC<FormStatusProps> = React.forwardRef<
  HTMLDivElement,
  FormStatusProps
>(({ className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={[classes.errorWrap, className].join(' ')}
      {...rest}
    >
      <span className={classes.error}>Erro</span>
    </div>
  );
});

export default memo(FormStatus);
