
import { FC } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../utils/constant";
import style from "./DropDownItem.module.scss"
import { TDropDownItem } from "./types";

const DropDownItem: FC<TDropDownItem> = ({link, onClick, avatarUrl, goToMenu, setActiveMenu, rightIcon, leftIcon, children}) => {

    return (
      <>
        {avatarUrl ? (
          <Link
            to={link || "#"}
            className={style["menu-item"]}
            onClick={
              onClick
                ? onClick
                : () => goToMenu && setActiveMenu(goToMenu)
            }
          >
            <img
              className={style["icon-button"]}
              src={`${baseURL}${avatarUrl}`}
            ></img>
            {children}
            <span className={style["icon-right"]}>{rightIcon}</span>
          </Link>
        ) : (
          <Link
            to={link || "#"}
            className={style["menu-item"]}
            onClick={
              onClick
                ? onClick
                : () => goToMenu && setActiveMenu(goToMenu)
            }
          >
            {avatarUrl && (
              <img className={style["icon-button"]} src={avatarUrl}></img>
            )}
            <span className={style["icon-button"]}>{leftIcon}</span>
            {children}
            <span className={style["icon-right"]}>{rightIcon}</span>
          </Link>
        )}
      </>
    );
  };

  export default DropDownItem