import React from 'react';
import ReactDOM from 'react-dom';

import Router from '@/presentation/router';
import { makeLogin } from './factories/pages/login/login-factory';

ReactDOM.render(
  <React.StrictMode>
    <Router makeLogin={makeLogin} />
  </React.StrictMode>,
  document.getElementById('app'),
);
