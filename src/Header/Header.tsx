import Logo from '../assets/img/Logo.svg';

import './Header.css';

export const Header = () => {
  return (
    <header className="App-header">
      <img src={Logo} alt="логотип Aviasales" />
    </header>
  );
};
