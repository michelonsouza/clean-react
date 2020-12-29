import React from 'react';

import { Login } from '@/presentation/pages';
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { makeLoginValidation } from './login-validation-factory';

export const makeLogin: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validationComposite = makeLoginValidation();

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
};
