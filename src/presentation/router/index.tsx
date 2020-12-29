import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

interface RouterProps {
  makeLogin: React.FC;
}

const Router: React.FC<RouterProps> = ({ makeLogin }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={makeLogin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
