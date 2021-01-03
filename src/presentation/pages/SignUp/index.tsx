import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <div className={classes.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state: {} }}>
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

          <Button type="submit">Criar conta</Button>

          <Link data-testid="signup-link" to="/login" className={classes.link}>
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
