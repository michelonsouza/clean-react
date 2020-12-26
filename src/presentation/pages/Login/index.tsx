import React from 'react';

import {
  Input,
  Button,
  LoginHeader,
  Footer,
  FormStatus,
} from '@/presentation/components';

import classes from './styles.scss';

const Login: React.FC = () => {
  return (
    <div className={classes.login}>
      <LoginHeader />
      <form className={classes.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />

        <Button type="submit">Entrar</Button>

        <span className={classes.link}>Criar conta</span>

        <FormStatus />
      </form>
      <Footer />
    </div>
  );
};

export default Login;
