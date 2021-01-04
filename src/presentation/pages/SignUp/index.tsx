import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AddAccount, SaveAccessToken } from '@/domain/usecases';
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
  addAccount: AddAccount;
  saveAccessToken: SaveAccessToken;
}

const SignUp: React.FC<SignUpProps> = ({
  validation,
  addAccount,
  saveAccessToken,
}) => {
  const history = useHistory();
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

  const formData = useMemo(() => {
    return {
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
    };
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        if (state.isLoading || isDisabled) {
          return;
        }

        setState(oldState => ({
          ...oldState,
          isLoading: true,
        }));

        const account = await addAccount.add({
          name: state.name,
          email: state.email,
          password: state.password,
          passwordConfirmation: state.passwordConfirmation,
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
      state.isLoading,
      isDisabled,
      addAccount,
      state.name,
      state.email,
      state.password,
      state.passwordConfirmation,
      saveAccessToken,
      history,
    ],
  );

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      nameError: validation.validate('name', formData),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.name, validation]);

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

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        formData,
      ),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.passwordConfirmation, validation]);

  return (
    <div className={classes.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          className={classes.form}
          data-testid="signup-form"
          onSubmit={handleSubmit}
        >
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

          <Link to="/login" data-testid="signin-link" className={classes.link}>
            Já tenho uma conta
          </Link>

          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
