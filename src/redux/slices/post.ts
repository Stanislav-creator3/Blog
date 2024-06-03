import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IPost, PostsState } from "./types";

interface PostsAttributes {
  date: string,
  id: string,
}


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchPostsUser = createAsyncThunk(
  "posts/fetchPostsUser",
  async (id) => {
    const { data } = await axios.get(`/posts/users/${id}`);
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    axios.delete(`/posts/${id}`);
  }
);

export const fetchPostDate = createAsyncThunk<IPost[], PostsAttributes>(
  `posts/fetchPostDate`,
  async (params) => {
    const { date, id} = params
    try {
      const { data } = await axios.get(`/posts/${date}/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchTagPosts = createAsyncThunk(
  "posts/fetchTagPosts",
  async (id) => {
    try {
      const { data } = await axios.get(`tags/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState : PostsState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  tagPosts: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending.type]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled.type]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected.type]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //PostsUser
    [fetchPostsUser.pending.type]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPostsUser.fulfilled.type]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsUser.rejected.type]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    //PostDate
    [fetchPostDate.pending.type]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPostDate.fulfilled.type]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostDate.rejected.type]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Tags
    [fetchTags.pending.type]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled.type]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected.type]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    //Tag Post
    [fetchTagPosts.pending.type]: (state) => {
      state.tagPosts.status = "loading";
    },
    [fetchTagPosts.fulfilled.type]: (state, action) => {
      state.tagPosts.items = action.payload;
      state.tagPosts.status = "loaded";
    },
    [fetchTagPosts.rejected.type]: (state) => {
      state.tagPosts.items = [];
      state.tagPosts.status = "error";
    },
    // delete post
    [fetchRemovePost.pending.type]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (item) => item._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
