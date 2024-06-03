import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import  CommentsBlock from "../components/CommnetsBlock/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/post";
import TabPanel from "../components/TabComponent/TabPanel";
import { getLastComments } from "../redux/slices/comment";
import { Container } from "@mui/material";
import { baseURL } from "../utils/constant";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { lastComments } = useSelector((state) => state.comment)

  const { posts, tags } = useSelector((state) => state.posts);
  
  const [valueTabs, setValueTabs] = React.useState(0);
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const postsPopular = posts.items
    .slice()
    .sort((a, b) => b.viewsCount - a.viewsCount);

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(getLastComments())
  }, []);

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleChangeTabs = (event, newValue) => {
    setValueTabs(newValue);
  };

  return (
    <Container  maxWidth="lg">
      <Tabs
        style={{ marginBottom: 15 }}
        value={valueTabs}
        onChange={handleChangeTabs}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" {...a11yProps(0)} />
        <Tab label="Популярные" {...a11yProps(1)} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          <TabPanel value={valueTabs} index={0}>
            {(isPostsLoading ? [...Array(5)] : posts.items).map((item, index) =>
              isPostsLoading ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
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
              )
            )}
          </TabPanel>
          <TabPanel value={valueTabs} index={1}>
            {(isPostsLoading ? [...Array(5)] : postsPopular).map(
              (item, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    id={item._id}
                    title={item.title}
                    imageUrl={
                      item.imageUrl
                        ? `${baseURL}${item.imageUrl}`
                        : ""
                    }
                    user={item.user}
                    createdAt={item.createdAt}
                    viewsCount={item.viewsCount}
                    commentsCount={3}
                    tags={item.tags}
                    isEditable={userData?._id === item.user._id}
                  />
                )
            )}
          </TabPanel>
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={lastComments}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
