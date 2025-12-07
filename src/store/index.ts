import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import friendsReducer from "./slices/friendsSlice";
import requestsReducer from "./slices/requestsSlice";
import chatReducer from "./slices/chatSlice";
import presenceReducer from "./slices/presenceSlice";
import serversReducer from "./slices/serversSlice";
import socketConnectionReducer from "./slices/socketConnectionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    friends: friendsReducer,
    requests: requestsReducer,
    chat: chatReducer,
    presence: presenceReducer,
    servers: serversReducer,
    socketConnection: socketConnectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
