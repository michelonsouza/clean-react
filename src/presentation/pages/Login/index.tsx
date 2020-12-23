import React from 'react';

import { Logo, Input, Button } from '@/presentation/components';

import classes from './styles.scss';

const Login: React.FC = () => {
  return (
    <div className={classes.login}>
      <header className={classes.header}>
        <Logo />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
      <form className={classes.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />

        <Button loading type="submit">
          Entrar
        </Button>

        <span className={classes.link}>Criar conta</span>

        <div className={classes.errorWrap}>
          <span className={classes.error}>Erro</span>
        </div>
      </form>
      <footer className={classes.footer} />
    </div>
  );
};

export default Login;
