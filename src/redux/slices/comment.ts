import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { CommentsState, IComments } from "./types";

interface CommentAttributes {
  postId: string,
  comment: string,
}

export const createComment = createAsyncThunk<IComments, CommentAttributes>(
  "comment/createComment",
  async (obj) => {
    const {postId, comment } = obj
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getLastComments = createAsyncThunk<IComments[]>(
  "comment/getLastComments",
  async () => {
    try {
      const { data } = await axios.get("/comments");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPostComment = createAsyncThunk<IComments[]>(
  "comment/getPostComment",
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: CommentsState = {
  comments: [],
  lastComments: [],
  loading: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [createComment.pending.type]: (state) => {
      state.loading = true;
    },
    [createComment.fulfilled.type]: (state, action) => {
      state.comments.push(action.payload);
    },
    [createComment.rejected.type]: (state) => {
      state.loading = false;
    },
    [getPostComment.pending.type]: (state) => {
      state.loading = true;
    },
    [getPostComment.fulfilled.type]: (state, action) => {
      state.comments = action.payload;
    },
    [getPostComment.rejected.type]: (state) => {
      state.loading = false;
    },
    [getLastComments.pending.type]: (state) => {
      state.loading = true;
    },
    [getLastComments.fulfilled.type]: (state, action) => {
      state.lastComments = action.payload;
    },
    [getLastComments.rejected.type]: (state) => {
      state.loading = false;
    },
  },
});

export const commentReducer = commentSlice.reducer;
