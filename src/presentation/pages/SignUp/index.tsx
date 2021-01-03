import React, { useState } from 'react';

import {
  Input,
  Button,
  LoginHeader,
  Footer,
  FormStatus,
} from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';

import classes from './styles.scss';

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo Obrigatório',
    emailError: 'Campo Obrigatório',
    passwordError: 'Campo Obrigatório',
    passwordConfirmationError: 'Campo Obrigatório',
    mainError: '',
  });

  return (
    <div className={classes.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state }}>
        <form className={classes.form}>
          <h2>Criação de conta</h2>
          <Input
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

          <Button type="submit" disabled data-testid="signup-button">
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
