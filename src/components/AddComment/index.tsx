import React, { FC } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { createComment } from "../../redux/slices/comment";
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../../utils/constant";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const AddComment: FC = () => {
  const [comment, setComment] = React.useState<string>('')
  const userData = useAppSelector((state) => state.auth.data);

  const params = useParams()
  const postId = params.id
  const dispatch = useAppDispatch()
  const handleSubmit =() => {
    try {
      if (postId) {
      dispatch(createComment({postId, comment}))
      setComment('')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {(userData?  
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`${baseURL}${userData.avatarUrl}`}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            value={comment}
            onChange={e => setComment(e.target.value)}
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={handleSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
     : <div className={styles.root}>
      <p>Чтобы оставить комментарий необходима <Link className={styles.link} to="/login">авторизация</Link> </p>
     </div> ) }
    </>
  );
};


export default AddComment