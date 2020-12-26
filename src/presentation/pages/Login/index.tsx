import React, { useState, useEffect, useMemo, useCallback } from 'react';

import {
  Input,
  Button,
  LoginHeader,
  Footer,
  FormStatus,
} from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols/validation';

import classes from './styles.scss';

interface LoginProps {
  validation: Validation;
}

const Login: React.FC<LoginProps> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  const isDisabled = useMemo(() => {
    return !!(state.emailError || state.passwordError);
  }, [state.emailError, state.passwordError]);

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      emailError: validation.validate('email', state.email),
    }));
  }, [state.email, validation]);

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      passwordError: validation.validate('password', state.password),
    }));
  }, [state.password, validation]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setState(oldState => ({
        ...oldState,
        isLoading: true,
      }));
    },
    [],
  );

  return (
    <div className={classes.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <Button
            type="submit"
            data-testid="submit-button"
            disabled={isDisabled}
            loading={state.isLoading}
          >
            Entrar
          </Button>

          <span className={classes.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
