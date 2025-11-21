import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FriendRequest {
  id: string | number;
  fromUser?: unknown;
  toUser?: unknown;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

export interface SocketState {
  friends: unknown[];
  incomingRequests: FriendRequest[];
  outgoingRequests: FriendRequest[];
}

const initialState: SocketState = {
  friends: [],
  incomingRequests: [],
  outgoingRequests: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setFriends(state, action: PayloadAction<unknown[]>) {
      state.friends = action.payload;
    },
    setIncoming(state, action: PayloadAction<FriendRequest[]>) {
      state.incomingRequests = action.payload;
    },
    setOutgoing(state, action: PayloadAction<FriendRequest[]>) {
      state.outgoingRequests = action.payload;
    },
    addIncomingRequest(state, action: PayloadAction<FriendRequest>) {
      state.incomingRequests.push(action.payload);
    },
    addOutgoingRequest(state, action: PayloadAction<FriendRequest>) {
      state.outgoingRequests.push(action.payload);
    },
    removeRequest(state, action: PayloadAction<string | number>) {
      state.incomingRequests = state.incomingRequests.filter((req) => req.id !== action.payload);
      state.outgoingRequests = state.outgoingRequests.filter((req) => req.id !== action.payload);
    },
    clearSocketState() {
      return initialState;
    },
  },
});

export const {
  setFriends,
  setIncoming,
  setOutgoing,
  addIncomingRequest,
  addOutgoingRequest,
  removeRequest,
  clearSocketState,
} = socketSlice.actions;

export default socketSlice.reducer;

