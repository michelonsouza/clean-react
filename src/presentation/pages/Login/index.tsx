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

export interface StateProps {
  isLoading: boolean;
}

const Login: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
  });

  return (
    <div className={classes.login}>
      <LoginHeader />
      <FormContext.Provider value={state}>
        <form className={classes.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <Button type="submit">Entrar</Button>

          <span className={classes.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
