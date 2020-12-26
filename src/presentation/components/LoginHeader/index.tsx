import React, { HTMLAttributes, memo } from 'react';

import Logo from '../Logo';

import classes from './styles.scss';

type LoginHeader = HTMLAttributes<HTMLElement>;

const LoginHeader: React.FC<LoginHeader> = ({ className, ...rest }) => {
  return (
    <header className={[classes.header, className].join(' ')} {...rest}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);
