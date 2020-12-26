import React, {
  InputHTMLAttributes,
  memo,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import { FormContext } from '@/presentation/contexts';

import classes from './styles.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ name, ...rest }, ref) => {
  const { errorState } = useContext(FormContext);
  const error = name ? errorState[name] : undefined;

  const statusContent = useMemo(() => {
    return error ? '🔴' : '🟢';
  }, [error]);

  const testId = useMemo(() => {
    return `${name}-status`;
  }, [name]);

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
        ref={ref}
        className={classes.input}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        readOnly
        type="text"
        {...rest}
      />

      <span data-testid={testId} title={error} className={classes.status}>
        {statusContent}
      </span>
    </div>
  );
});

export default memo(Input);
