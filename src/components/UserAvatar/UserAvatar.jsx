import { useCallback, useRef, useState } from "react";
import { baseURL } from "../../utils/constant";
import axios from "../../axios";
import { fetchUpdateAvatar } from "../../redux/slices/auth";
import style from "./style.module.scss";
import Button from "../ui/Button/Button";
import { useAppDispatch } from "../../hooks/redux";

const UserAvatar = ({user, setActive}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [formdata, setFormData] = useState(null);
  const inputFileRef = useRef(null);
  const avatar = `${baseURL}${user?.avatarUrl}`;
  const dispatch = useAppDispatch();
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      const src = URL.createObjectURL(event.target.files[0]);
      setImageUrl(src);
      formData.append("image", file);
      setFormData(formData);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const handleSaveFile = useCallback(async () => {
    try {
      const { data } = await axios.post("/upload", formdata);
      const avatar = { avatarUrl: data.url };
      const avatarUpdate = await dispatch(fetchUpdateAvatar(avatar));
      setImageUrl(avatarUpdate.avatarUrl);
      setActive(false)
      setFormData(null);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке файла");
    }
  }, [imageUrl]);
  return (
    <div className={style.container}>
      <img
        className={style.avatar}
        src={formdata ? imageUrl : avatar}
        alt="Uploaded"
      />

      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Выбрать изображение
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {formdata && (
        <>
          <Button type='submit' onClick={handleSaveFile}>Сохранить</Button>
        </>
      )}
    </div>
  );
};

export default UserAvatar;
