/// <reference types="vite-plugin-svgr/client" />
import { FC, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { selectIsAuth } from "../../redux/slices/auth";
import NavBar from "../ui/NavBar/NavBar.tsx";
import NavBarItem from "../ui/NavBar/NavBarItem";
import BellIcon from "../../icons/bell.svg?react";
import MessageIcon from "../../icons/messenger.svg?react";
import CaretIcon from "../../icons/caret.svg?react";
import PlusIcon from "../../icons/plus.svg?react";
import DropDownMenu from "../ui/dropdown/dropdown-menu.tsx";
import ToolTip from "../ui/tooltip/ToolTip.tsx";
import { useAppSelector } from "../../hooks/redux";

export const Header: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>TALANT BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <NavBar>
                  <ToolTip
                    text="Новая статья"
                    customClass={styles.toolTipCustom}
                  >
                    <NavBarItem
                      link="/add-post"
                      customClass={styles.customIconAdd}
                      icon={<PlusIcon />}
                    ></NavBarItem>
                  </ToolTip>
                  <ToolTip text="Оповещения" customClass={styles.toolTipCustom}>
                    <NavBarItem
                      customClass={styles.customIconBell}
                      icon={<BellIcon />}
                    ></NavBarItem>
                  </ToolTip>
                  <ToolTip text="Сообщения" customClass={styles.toolTipCustom}>
                    <NavBarItem icon={<MessageIcon />}></NavBarItem>
                  </ToolTip>
                  <NavBarItem
                    open={open}
                    setOpen={setOpen}
                    icon={<CaretIcon />}
                  >
                    <DropDownMenu open={open} />
                  </NavBarItem>
                </NavBar>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
