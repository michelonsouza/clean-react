import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

interface RouterProps {
  makeLogin: React.FC;
  makeSignUp: React.FC;
}

const Router: React.FC<RouterProps> = ({ makeLogin, makeSignUp }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={makeLogin} />
        <Route path="/signup" component={makeSignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
