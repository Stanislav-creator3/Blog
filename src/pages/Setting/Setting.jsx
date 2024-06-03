import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Form from "../../components/ui/Form/Form";
import Input from "../../components/ui/input/input.jsx";
import Button from "../../components/ui/Button/Button.tsx";
import  EditIcon  from "../../icons/edit_icon.svg";
import Loading from "../../components/ui/Loading/Loading.jsx";
import Loaded from "../../components/ui/Loaded/loaded.jsx";
import Modal from "../../components/Modal/Modal";
import { fetchUpdate } from "../../redux/slices/auth";
import { baseURL } from "../../utils/constant";
import UserAvatar from "../../components/UserAvatar/UserAvatar.jsx";
import style from "./Setting.module.scss";
const Setting = ({ userData }) => {
    const [modalActive, setModalActive] = useState(false);
    const [loaded, setLoaded] = useState(true);
  
    const [loading, setLoading] = useState(false);
    const status = useSelector((state) => state.auth.status);
    const imageStyle = {
      backgroundImage: `url("${baseURL}${userData.avatarUrl}")`,
    };
  
    const dispatch = useDispatch();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        fullName: userData.fullName ? userData.fullName : "",
        about: userData.about ? userData.about : "",
      },
      mode: "onChange",
    });
    const onSubmit = async (values) => {
      setLoading(true);
      setLoaded(false);
      const data = await dispatch(fetchUpdate(values));
  
      if (!data.payload) {
        return alert("Не удалось обновить данные");
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    };
  
    return (
      userData && (
        <div className={style.container}>
          <div className={style.user}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <p>Изображение профиля</p>
              <div
                className={style.user__avatar}
                style={imageStyle}
                onClick={() => setModalActive(true)}
              ></div>
              <p className={style.form__text}>Имя</p>
              <Input
                fieldName="fullName"
                register={register}
                errors={errors}
                maximLength={20}
                minimLength={2}
                id="fullName"
                type="text"
                label="full Name"
                name="fullName"
                autocomplete="off"
                placeholder="Введите ваше Имя"
                icon={<EditIcon />}
              />
              <p className={style.form__text}>О себе</p>
              <Input
                fieldName="about"
                register={register}
                errors={errors}
                maximLength={20}
                minimLength={2}
                id="about"
                label="about"
                name="about"
                placeholder="Расскажите о себе"
                autocomplete="off"
                icon={<EditIcon />}
              />
              <Button type="submit" disabled={loading || Boolean(errors.password?.fullName) || Boolean(errors.password?.about)}>
                {loading ? loaded ? <Loaded /> : <Loading /> : "Cохранить"}
              </Button>
            </Form>
          </div>
          <Modal active={modalActive} setActive={setModalActive}>
            <UserAvatar setActive={setModalActive} />
          </Modal>
        </div>
      )
    );
  };

export default Setting