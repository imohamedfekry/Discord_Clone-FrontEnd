import {create} from "zustand";

export interface FriendRequest {
  id: string | number;
  fromUser?: any;
  toUser?: any;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

type SocketState = {
  friends: any[];
  incomingRequests: FriendRequest[];
  outgoingRequests: FriendRequest[];
  setFriends: (list: any[]) => void;
  setIncoming: (list: FriendRequest[]) => void;
  setOutgoing: (list: FriendRequest[]) => void;
  addIncomingRequest: (req: FriendRequest) => void;
  addOutgoingRequest: (req: FriendRequest) => void;
  removeRequest: (id: string | number) => void;
  clearAll: () => void;
};

export const useSocketStore = create<SocketState>((set) => ({
  friends: [],
  incomingRequests: [],
  outgoingRequests: [],

  setFriends: (list) => set({ friends: list }),
  setIncoming: (list) => set({ incomingRequests: list }),
  setOutgoing: (list) => set({ outgoingRequests: list }),

  addIncomingRequest: (req) =>
    set((s) => ({ incomingRequests: [...s.incomingRequests, req] })),

  addOutgoingRequest: (req) =>
    set((s) => ({ outgoingRequests: [...s.outgoingRequests, req] })),

  removeRequest: (id) =>
    set((s) => ({
      incomingRequests: s.incomingRequests.filter((r) => r.id !== id),
      outgoingRequests: s.outgoingRequests.filter((r) => r.id !== id),
    })),

  clearAll: () => set({ friends: [], incomingRequests: [], outgoingRequests: [] }),
}));
