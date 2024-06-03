import { FC } from "react";
import style from "./Form.module.scss";
import { TForm } from "./types";

const Form: FC<TForm> = ({ children, ...props }) => {
  return (
    <form className={style.form} noValidate {...props}>
      {children}
    </form>
  );
};

export default Form;
