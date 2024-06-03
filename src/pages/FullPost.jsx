import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import AddComment from "../components/AddComment/index.tsx"
import CommentsBlock from "../components/CommnetsBlock/CommentsBlock.tsx"
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { getPostComment } from "../redux/slices/comment";
import { Container } from "@mui/material";
export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { comments } = useSelector((state) => state.comment)
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchComments = useCallback(async() => {
    try {
      dispatch(getPostComment(id));
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch])

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error post");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <Container  maxWidth="lg">
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <p>
          <ReactMarkdown children={data.text} />
        </p>
      </Post>
      <CommentsBlock
        items={comments}
        isLoading={false}
      >
        <AddComment />
      </CommentsBlock>
    </Container>
  );
};
