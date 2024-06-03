import React from "react";
import styles from "./UserInfo.module.scss";
import { baseURL } from "../../utils/constant";
import { Link } from "react-router-dom";

export const UserInfo = ({ _id, avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <Link className={styles.link} to={`/profile/${_id}`}>
        <img
          className={styles.avatar}
          src={`${baseURL}${avatarUrl}`}
          alt={fullName}
        />
      </Link>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
