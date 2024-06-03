/// <reference types="vite-plugin-svgr/client" />

import "./index.css";
import CogIcon  from "../../../icons/cog.svg?react";
import ChevronIcon from "../../../icons/chevron.svg?react";
import ArrowIcon from "../../../icons/arrow.svg?react";
import { CSSTransition } from "react-transition-group";
import { FC, useState } from "react";
import { logout } from "../../../redux/slices/auth";
import { TDropDown } from "./types";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import DropDownItem from "../../DropDownItem/DropDownItem";

const DropDownMenu: FC<TDropDown> = ({ open }) => {
  const [activeMenu, setActiveMenu] = useState<string>("main");
  const [menuHeight, setMenuHeight] = useState<number>();
  const userData  = useAppSelector((state) => state.auth.data);

  const dispatch = useAppDispatch()
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  const calcHeight = (el: HTMLElement) => {
    const height = el.offsetHeight;
    setMenuHeight(height + 30);
  };

  return (
    <div
      className={open ? "dropdown active" : "dropdown hidden"}
      style={{ height: menuHeight }}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        unmountOnExit
      >
        <div className="menu">
          <DropDownItem
            avatarUrl={userData?.avatarUrl}
            link={`/cabinet/${userData?._id}`}
          >
            Профиль
          </DropDownItem>
          <DropDownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            setActiveMenu={setActiveMenu}
            goToMenu="settings"
          >
            Настройки
          </DropDownItem>
          <DropDownItem onClick={onClickLogout}>Выйти</DropDownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<ArrowIcon />}
            goToMenu="main"
          ></DropDownItem>
          <DropDownItem>Setting</DropDownItem>
          <DropDownItem>Setting</DropDownItem>
          <DropDownItem>Setting</DropDownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropDownMenu;
