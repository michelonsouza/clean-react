import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { SignUp } from '@/presentation/pages';

interface RouterProps {
  makeLogin: React.FC;
}

const Router: React.FC<RouterProps> = ({ makeLogin }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={makeLogin} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
