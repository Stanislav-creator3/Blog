import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe } from "./redux/slices/auth";
import TagPosts from "./components/TagPost/TagPosts";
import Cabinet from "./pages/Cabinet/cabinet";
import MyPosts from "./components/MyPosts/MyPosts";
import HomeProfile from "./components/home/home.tsx";
import Setting from "./pages/Setting/Setting";
import Profile from "./pages/Profile/Profile";
import PostsDate from "./pages/PostsDate/PostsDate";
import { useAppDispatch, useAppSelector } from "./hooks/redux";


function App() {
  const dispatch = useAppDispatch();
  // const isAuth = useSelector(selectIsAuth)
  const userData = useAppSelector((state) => state.auth.data);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:id" element={<TagPosts/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/posts/:date/:id" element={<PostsDate/>}/>

          <Route path="/cabinet" element={<Cabinet userData={userData}/>}>
              <Route path=":id" element={<HomeProfile/>}/>
              <Route path="posts/:id" element={<MyPosts userData={userData}/>}/>
              <Route path="setting/:id" element={<Setting userData={userData}/>}/>

          </Route>

        </Routes>
    </>
  );
}

export default App;
