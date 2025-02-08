import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../features/settings/settingsSlice.ts";
import pendulumReducer from "../features/pendulum/pendulumSlice.ts";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    pendulum: pendulumReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
