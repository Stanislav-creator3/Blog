import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import { FC } from "react";
import { TNavBarItem } from "./types";

const NavBarItem : FC<TNavBarItem> = ({ customClass, link, children, icon, open, setOpen }) => {
  const styleIcon = customClass
    ? `${style["icon-button"]} ${customClass}`
    : `${style["icon-button"]}`;
  return (
    <li className={style["nav-item"]}>
      <Link
        to={link || '#'}
        className={styleIcon}
        onClick={() => setOpen(!open)}
      >
       {icon}
      </Link>
      {children}
    </li>
  );
};

export default NavBarItem;
