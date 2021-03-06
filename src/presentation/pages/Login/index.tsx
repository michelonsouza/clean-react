import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Authentication, SaveAccessToken } from '@/domain/usecases';
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
  saveAccessToken: SaveAccessToken;
}

const Login: React.FC<LoginProps> = ({
  validation,
  authentication,
  saveAccessToken,
}) => {
  const history = useHistory();
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

  const formData = useMemo(() => {
    return {
      email: state.email,
      password: state.password,
    };
  }, [state.email, state.password]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      try {
        if (state.isLoading || isDisabled) {
          return;
        }

        setState(oldState => ({
          ...oldState,
          isLoading: true,
        }));

        const account = await authentication.auth({
          email: state.email,
          password: state.password,
        });

        await saveAccessToken.save(account.accessToken);
        history.replace('/');
      } catch (error) {
        setState(oldState => ({
          ...oldState,
          isLoading: false,
          mainError: error.message,
        }));
      }
    },
    [
      authentication,
      state.email,
      state.password,
      state.isLoading,
      isDisabled,
      history,
      saveAccessToken,
    ],
  );

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      emailError: validation.validate('email', formData),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.email, validation]);

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      passwordError: validation.validate('password', formData),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.password, validation]);

  return (
    <div className={classes.login} data-testid="login-page">
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="login-form"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input
            type="email"
            name="email"
            autoComplete="username"
            placeholder="Digite seu e-mail"
          />
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
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

          <Link data-testid="signup-link" to="/signup" className={classes.link}>
            Criar conta
          </Link>

          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
