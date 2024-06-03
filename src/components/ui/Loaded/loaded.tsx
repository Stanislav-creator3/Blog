import { FC } from "react";
import style from "./Loaded.module.scss";

const Loaded : FC = () => {
  return (
    <span className={style.loaded}>
        Успешно!
    </span>
  );
};

export default Loaded;
