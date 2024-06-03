import style from "./input.module.scss";

const Input = ({
  register,
  fieldName,
  errors,
  isRequired,
  maximLength,
  minimLength,
  ...props
}) => {

  return(
  <div className={style.field}>
    <input
      className={style.input}
      {...register(fieldName, {
        required: {
          value: isRequired,
          message: "Поле обязательно к заполнению",
        },
        maxLength: {
          value: maximLength,
          message: `Максимальная длина ${maximLength} символов`,
        },
        minLength: {
          value: minimLength,
          message: `Минимальная длина ${minimLength} символов`,
        },
      })}
      {...props}
    />
    <p className={style.input__error}>{errors[fieldName] && errors[fieldName].message}</p>
  </div>);
};

export default Input;
