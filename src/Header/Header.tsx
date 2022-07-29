import Logo from '../assets/Logo.svg';

import classes from './Header.module.scss';

export const Header = () => {
  return (
    <header className={classes.header}>
      <img src={Logo} alt="логотип Aviasales" />
    </header>
  );
};
