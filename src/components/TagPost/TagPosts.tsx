import React, { FC } from "react";
import { fetchTagPosts } from "../../redux/slices/post";
import { useParams } from "react-router-dom";
import TabPanel from "../TabComponent/TabPanel";
import  Post  from "../Post";
import { Grid, Tab, Tabs, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const TagPosts : FC = () => {
  const { tagPosts } = useAppSelector((store) => store.posts);
  const userData = useAppSelector((state) => state.auth.data);
  const [valueTabs, setValueTabs] = React.useState(0);
  const isPostsLoading = tagPosts.status === "loading";
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const postsPopular = tagPosts.items
    .slice()
    .sort((a, b) => b.viewsCount - a.viewsCount);

  const handleChangeTabs = (newValue) => {
    setValueTabs(newValue);
  };
  React.useEffect(() => {
    dispatch(fetchTagPosts(id));
  }, [dispatch]);
  const a11yProps = (index : number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
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
        <Grid xs={12} item>
          <TabPanel value={valueTabs} index={0}>
            {(isPostsLoading ? [...Array(5)] : tagPosts.items).map(
              (item, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    id={item._id}
                    title={item.title}
                    imageUrl={
                      item.imageUrl
                        ? `http://localhost:4444${item.imageUrl}`
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
                        ? `http://localhost:4444${item.imageUrl}`
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
      </Grid>
    </Container>
  );
};

export default TagPosts;
