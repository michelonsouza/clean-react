import React, { HTMLAttributes, memo, useContext } from 'react';

import { FormContext } from '@/presentation/contexts';

import classes from './styles.scss';

type FormStatusProps = HTMLAttributes<HTMLDivElement>;

const FormStatus: React.FC<FormStatusProps> = React.forwardRef<
  HTMLDivElement,
  FormStatusProps
>(({ className, ...rest }, ref) => {
  const {
    errorState: { main },
  } = useContext(FormContext);

  return (
    <div
      data-testid="error-wrap"
      ref={ref}
      className={[classes.errorWrap, className].join(' ')}
      {...rest}
    >
      {main && <span className={classes.error}>{main}</span>}
    </div>
  );
});

export default memo(FormStatus);
