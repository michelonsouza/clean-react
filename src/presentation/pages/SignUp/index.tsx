import React, { useState, useEffect, useMemo } from 'react';

import {
  Input,
  Button,
  LoginHeader,
  Footer,
  FormStatus,
} from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols';

import classes from './styles.scss';

interface SignUpProps {
  validation: Validation;
}

const SignUp: React.FC<SignUpProps> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: '',
  });

  const isDisabled = useMemo(() => {
    return !!(
      state.nameError ||
      state.emailError ||
      state.passwordError ||
      state.passwordConfirmationError
    );
  }, [
    state.nameError,
    state.emailError,
    state.passwordError,
    state.passwordConfirmationError,
  ]);

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      nameError: validation.validate('name', state.name),
    }));
  }, [state.name, validation]);

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

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation,
      ),
    }));
  }, [state.passwordConfirmation, validation]);

  return (
    <div className={classes.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={classes.form}>
          <h2>Criação de conta</h2>
          <Input
            data-testid="name"
            type="text"
            name="name"
            autoComplete="username"
            placeholder="Digite seu nome"
          />
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
          <Input
            type="password"
            name="passwordConfirmation"
            autoComplete="current-password"
            placeholder="Repita sua senha"
          />

          <Button
            type="submit"
            disabled={isDisabled}
            loading={state.isLoading}
            data-testid="signup-button"
          >
            Criar conta
          </Button>

          <span data-testid="signup-link" className={classes.link}>
            Já tenho uma conta
          </span>

          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
