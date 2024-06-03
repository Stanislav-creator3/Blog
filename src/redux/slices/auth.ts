import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { UserState } from "./types";
import { RootState } from "../store";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchUpdate = createAsyncThunk(
  "auth/fetchUpdate",
  async (params) => {
    const { data } = await axios.patch("/user", params);
    return data;
  }
);

export const fetchUpdateAvatar = createAsyncThunk(
  "auth/fetchUpdateAvatar",
  async (params) => {
    const { data } = await axios.post("/user/avatar", params);
    return data;
  }
);


const initialState : UserState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    //Login
    [fetchAuth.pending.type]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuth.rejected.type]: (state) => {
      state.data = null;
      state.status = "error";
    },
    //Me
    [fetchAuthMe.pending.type]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthMe.rejected.type]: (state) => {
      state.data = null;
      state.status = "error";
    },
    //Register
    [fetchRegister.pending.type]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegister.rejected.type]: (state) => {
      state.data = null;
      state.status = "error";
    },
    //Update user
    [fetchUpdate.pending.type]: (state) => {
      state.status = "loading";
    },
    [fetchUpdate.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchUpdate.rejected.type]: (state) => {
      state.data = null;
      state.status = "error";
    },
    //Update avatar
    [fetchUpdateAvatar.pending.type]: (state) => {
      state.status = "loading";
    },
    [fetchUpdateAvatar.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchUpdateAvatar.rejected.type]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const selectIsAuth = (state : RootState ) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
