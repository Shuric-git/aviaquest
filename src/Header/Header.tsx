import Logo from '../assets/img/Logo.svg';

import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="логотип Aviasales" />
    </header>
  );
};
