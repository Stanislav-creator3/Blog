import { useSelector } from "react-redux";
import SideNav from "../../components/SideNav/SideNav";
import style from "./cabinet.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, Outlet } from "react-router-dom";
const Cabinet = ({ userData }) => {
  const isAuth = useSelector(selectIsAuth);
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }
  return (
    userData && (
      <>
        <SideNav />
        <div className={style.container}>
          <div>
            <p className={style.title}>С возращением, {userData.fullName}!</p>
            <p className={style.text}>Хорошего дня!</p>
          </div>
          <Outlet />
        </div>
      </>
    )
  );
};

export default Cabinet;
