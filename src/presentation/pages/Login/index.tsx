import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { Authentication } from '@/domain/usecases';
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
  authentication: Authentication;
}

const Login: React.FC<LoginProps> = ({ validation, authentication }) => {
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

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      if (state.isLoading || isDisabled) {
        return;
      }

      setState(oldState => ({
        ...oldState,
        isLoading: true,
      }));

      await authentication.auth({
        email: state.email,
        password: state.password,
      });
    },
    [authentication, state.email, state.password, state.isLoading, isDisabled],
  );

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

  return (
    <div className={classes.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="login-form"
          className={classes.form}
          onSubmit={handleSubmit}
        >
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
