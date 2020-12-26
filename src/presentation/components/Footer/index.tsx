import React, { memo, HTMLAttributes } from 'react';

import classes from './styles.scss';

type FooterProps = HTMLAttributes<HTMLElement>;

const Footer: React.FC<FooterProps> = React.forwardRef<
  HTMLElement,
  FooterProps
>(() => {
  return <footer className={classes.footer} />;
});

export default memo(Footer);
