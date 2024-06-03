import { useEffect } from "react";
import { useParams } from "react-router-dom";
import  Post  from "../../components/Post";
import { baseURL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostDate } from "../../redux/slices/post";
import style from "./Post.module.scss"
const PostsDate = () => {
  const { date, id } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPostDate({date, id}));
  }, []);
  console.log(posts);
  return (
    <div className={style.container}>
      {posts.items.length > 0 ? (
        <div>
        <h3>Посты за {date}</h3>
        {posts.items.map((item, index) => (
          <Post
            key={index}
            id={item._id}
            title={item.title}
            imageUrl={item.imageUrl ? `${baseURL}${item.imageUrl}` : ""}
            user={item.user}
            createdAt={item.createdAt}
            viewsCount={item.viewsCount}
            commentsCount={item.commentsCount}
            tags={item.tags}
            isEditable={userData?._id === item.user._id}
          />
        ))}
        </div> ) : (
        <p>Постов за {date}. Не найдено </p>
      )}
    </div>
  );
};

export default PostsDate;
