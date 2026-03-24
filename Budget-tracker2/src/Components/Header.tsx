import { NavLink } from "react-router";
import "./Header.css";

interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-left">
        <NavLink to="/" className="header__title">
          <h1 className="header__title">{title}</h1>
        </NavLink>
        <p className="header__description">{description}</p>
      </div>
      <div className="header-right">
        <NavLink to="./list" className="header__navlink">
          LIST
        </NavLink>
        <NavLink to="./add" className="header__navlink">
          ADD
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
