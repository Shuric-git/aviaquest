import Logo from '../assets/img/Logo.svg';

// @ts-ignore
import classes from './Header.module.scss';

export const Header = () => {
  return (
    <header className={classes.header}>
      <img src={Logo} alt="логотип Aviasales" />
    </header>
  );
};
