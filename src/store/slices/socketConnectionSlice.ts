import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketConnectionState {
    isConnected: boolean;
    isReconnecting: boolean;
    lastPing: number | null;
}

const initialState: SocketConnectionState = {
    isConnected: false,
    isReconnecting: false,
    lastPing: null,
};

const socketConnectionSlice = createSlice({
    name: 'socketConnection',
    initialState,
    reducers: {
        setConnected(state, action: PayloadAction<boolean>) {
            state.isConnected = action.payload;
            if (action.payload) {
                state.isReconnecting = false;
            }
        },
        setReconnecting(state, action: PayloadAction<boolean>) {
            state.isReconnecting = action.payload;
        },
        updatePing(state, action: PayloadAction<number>) {
            state.lastPing = action.payload;
        },
    },
});

export const { setConnected, setReconnecting, updatePing } = socketConnectionSlice.actions;
export default socketConnectionSlice.reducer;
