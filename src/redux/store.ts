import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/post";
import { authReducer } from "./slices/auth";
import { commentReducer } from "./slices/comment";

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  comment: commentReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
