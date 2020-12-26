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
  const { state, setState } = useContext(FormContext);
  const error = name ? state[`${name}Error`] : undefined;

  const statusContent = useMemo(() => {
    return error ? '🔴' : '🟢';
  }, [error]);

  const statusTitle = useMemo(() => {
    return error || 'Tudo certo';
  }, [error]);

  const stattusTestId = useMemo(() => {
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

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setState((oldState: any) => {
        return {
          ...oldState,
          [event.target.name]: event.target.value,
        };
      });
    },
    [setState],
  );

  return (
    <div className={classes.inputWrap}>
      <input
        ref={ref}
        className={classes.input}
        name={name}
        data-testid={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        readOnly
        type="text"
        {...rest}
      />

      <span
        data-testid={stattusTestId}
        title={statusTitle}
        className={classes.status}
      >
        {statusContent}
      </span>
    </div>
  );
});

export default memo(Input);
