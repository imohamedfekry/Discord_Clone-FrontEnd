import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { FriendRequest } from '../../types/models';
import { RootState } from '../index';

const requestsAdapter = createEntityAdapter<FriendRequest>();

const requestsSlice = createSlice({
    name: 'requests',
    initialState: requestsAdapter.getInitialState(),
    reducers: {
        setRequests: requestsAdapter.setAll,
        addIncomingRequest: requestsAdapter.addOne,
        removeIncomingRequest: requestsAdapter.removeOne,
        updateRequest: requestsAdapter.updateOne,
    },
});

export const { setRequests, addIncomingRequest, removeIncomingRequest, updateRequest } = requestsSlice.actions;
export const requestsSelectors = requestsAdapter.getSelectors<RootState>((state) => state.requests);
export default requestsSlice.reducer;
