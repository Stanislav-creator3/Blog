import { FC } from "react";
import style from "./NavBar.module.scss";
import { TNavBar } from "./types";

const NavBar: FC<TNavBar> = ({ children }) => {
  return (
    <nav className={style.navbar}>
      <ul className={style["navbar-nav"]}>{children}</ul>
    </nav>
  );
};

export default NavBar;
