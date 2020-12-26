import React, { useState, useEffect } from 'react';

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
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email, validation]);

  useEffect(() => {
    validation.validate({ password: state.password });
  }, [state.password, validation]);

  return (
    <div className={classes.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={classes.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <Button type="submit" disabled>
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
