import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/models';
import { RootState } from '../index';

const friendsAdapter = createEntityAdapter<User>();

const friendsSlice = createSlice({
    name: 'friends',
    initialState: friendsAdapter.getInitialState(),
    reducers: {
        setFriends: friendsAdapter.setAll,
        addFriend: friendsAdapter.addOne,
        removeFriend: friendsAdapter.removeOne,
        updateFriend: friendsAdapter.updateOne,
    },
});

export const { setFriends, addFriend, removeFriend, updateFriend } = friendsSlice.actions;
export const friendsSelectors = friendsAdapter.getSelectors<RootState>((state) => state.friends);
export default friendsSlice.reducer;
