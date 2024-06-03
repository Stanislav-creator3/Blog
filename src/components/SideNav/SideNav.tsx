/// <reference types="vite-plugin-svgr/client" />

import style from "./SideNav.module.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DashBoardIcon from "../../icons/dashboard.svg?react";
import BriefCaseIcon  from "../../icons/briefcase.svg?react";
import CogIcon  from "../../icons/cog.svg?react";
import LogoutIcon from "../../icons/logout.svg?react";
import { logout } from "../../redux/slices/auth";
import { useAppDispatch } from "../../hooks/redux";

const SideNav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams()
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      navigate('/');
    }
  };
  
  return (
    <div className={style.sidenav}>
      <ul className={style.sidenav__list}>
        <li className={style["sidenav__list-item"]}>
          <NavLink  className={style["sidenav__list-button"]} to={`/cabinet/${id}`}>
            <span className={style["sidenav__list-icon"]}>
              <DashBoardIcon />
            </span>
            Home
          </NavLink>
        </li>
        <li className={style["sidenav__list-item"]}>
          <NavLink className={style["sidenav__list-button"]} to={`/cabinet/posts/${id}`}>
            <span className={style["sidenav__list-icon"]}>
              <BriefCaseIcon/>
            </span>
            Мои статьи
          </NavLink>
        </li>
        <li className={style["sidenav__list-item"]}>
          <NavLink className={style["sidenav__list-button"]} to={`/cabinet/setting/${id}`}>
            <span className={style["sidenav__list-icon"]}>
              <CogIcon />
            </span>
            Настройки
          </NavLink>
        </li>
        <li className={style["sidenav__list-item"]}>
          <NavLink
            onClick={onClickLogout}
            className={style["sidenav__list-button"]}
            to="#"
          >
            <span className={style["sidenav__list-icon"]}>
              <LogoutIcon />
            </span>
            Выйти
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideNav