import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PresenceStatus } from '../../types/models';

interface PresenceState {
    statuses: Record<string, PresenceStatus>; // userId -> status
}

const initialState: PresenceState = {
    statuses: {},
};

const presenceSlice = createSlice({
    name: 'presence',
    initialState,
    reducers: {
        setPresenceStatus(state, action: PayloadAction<{ userId: string; status: PresenceStatus }>) {
            state.statuses[action.payload.userId] = action.payload.status;
        },
        setAllPresences(state, action: PayloadAction<Record<string, PresenceStatus>>) {
            state.statuses = action.payload;
        },
    },
});

export const { setPresenceStatus, setAllPresences } = presenceSlice.actions;
export default presenceSlice.reducer;
