import React from 'react';
import ReactDOM from 'react-dom';

import '@/presentation/styles/global.scss';

import Router from '@/presentation/router';
import { makeLogin } from './factories/pages/login/login-factory';
import { makeSignUp } from './factories/pages/signup/sign-up-factory';

ReactDOM.render(
  <React.StrictMode>
    <Router makeLogin={makeLogin} makeSignUp={makeSignUp} />
  </React.StrictMode>,
  document.getElementById('app'),
);
