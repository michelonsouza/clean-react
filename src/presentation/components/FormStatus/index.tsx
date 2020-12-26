import React, { HTMLAttributes, memo, useContext } from 'react';

import { FormContext } from '@/presentation/contexts';

import classes from './styles.scss';

type FormStatusProps = HTMLAttributes<HTMLDivElement>;

const FormStatus: React.FC<FormStatusProps> = React.forwardRef<
  HTMLDivElement,
  FormStatusProps
>(({ className, ...rest }, ref) => {
  const { errorMessage } = useContext(FormContext);

  return (
    <div
      data-testid="error-wrap"
      ref={ref}
      className={[classes.errorWrap, className].join(' ')}
      {...rest}
    >
      {errorMessage && <span className={classes.error}>{errorMessage}</span>}
    </div>
  );
});

export default memo(FormStatus);
