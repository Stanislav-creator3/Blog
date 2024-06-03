import { FC, useEffect, useState } from "react";
import Modal from "../Modal/Modal.tsx";
import { baseURL } from "../../utils/constant.js";
import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import style from "./Home.module.scss";
import HeatMap from "../HeatMap/HeatMap.js";
import axios from "../../axios.js";
import Post from "../Post/index.tsx";
import TabPanel from "../TabComponent/TabPanel.jsx";
import { Tab, Tabs } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchPostsUser } from "../../redux/slices/post.js";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.js";
import { IUser } from "../../redux/slices/types.js";
const HomeProfile : FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.auth.data);
  const { posts } = useAppSelector((state) => state.posts);
  const postsPopular = posts.items
  ?.slice()
  .sort((a, b) => b.viewsCount - a.viewsCount);
  const lengthPosts = posts.items?.length;
  const countComments = posts.items
          ?.filter((item) => item.comments.length > 0)
          .map((item) => item.comments)
          .flat().length;
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<IUser | null>(null);
  const [valueTabs, setValueTabs] = useState<number>(0);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchPostsUser(id));
    async function fetchData() {
      const user = await axios.get(`/users/${id}`);
      setUser(user.data);
    }
    fetchData();
  }, [id]);
  const imageStyle = {
    backgroundImage: `url("${baseURL}${user?.avatarUrl}")`,
  };

  const a11yProps = (index : number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleChangeTabs = (newValue ) => {
    setValueTabs(newValue);
  };

  return (
    user &&
    posts && (
      <>
        <div className={style.user}>
          <div>
            <div className={style.user__avatar} style={imageStyle}></div>
            <p>{user.fullName}</p>
            <p>{user.about}</p>
            <p>Всего статей: {lengthPosts}</p>
            <p>Комментарий под статьями: {countComments}</p>
          </div>
          <div>
            <p>Активность пользователя</p>
            <HeatMap />
          </div>
        </div>
        <div>
          <h1>Статьи</h1>
          {posts.items.length > 0 ? (
            <>
              <Tabs
                style={{ marginBottom: 15 }}
                value={valueTabs}
                onChange={handleChangeTabs}
                aria-label="basic tabs example"
              >
                <Tab label="Недавние" {...a11yProps(0)} />
                <Tab label="Популярные" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={valueTabs} index={0}>
                <div className={style.container__posts}>
                  {posts.items.map((item, index) => (
                    <Post
                      key={index}
                      id={item._id}
                      title={item.title}
                      imageUrl={
                        item.imageUrl ? `${baseURL}${item.imageUrl}` : ""
                      }
                      user={item.user}
                      createdAt={item.createdAt}
                      viewsCount={item.viewsCount}
                      commentsCount={item.commentsCount}
                      tags={item.tags}
                      isEditable={userData?._id === item.user._id}
                    />
                  ))}{" "}
                </div>
              </TabPanel>
              <TabPanel value={valueTabs} index={1}>
                <div className={style.container__posts}>
                  {postsPopular.map((item, index) => (
                    <Post
                      key={index}
                      id={item._id}
                      title={item.title}
                      imageUrl={
                        item.imageUrl ? `${baseURL}${item.imageUrl}` : ""
                      }
                      user={item.user}
                      createdAt={item.createdAt}
                      viewsCount={item.viewsCount}
                      commentsCount={item.commentsCount}
                      tags={item.tags}
                      isEditable={userData?._id === item.user._id}
                    />
                  ))}
                </div>
              </TabPanel>{" "}
            </>
          ) : (
            "Пусто 😢"
          )}
        </div>
        <Modal active={modalActive} setActive={setModalActive}>
          <UserAvatar user={user} setActive={setModalActive} />
        </Modal>
      </>
    )
  );
};

export default HomeProfile;
