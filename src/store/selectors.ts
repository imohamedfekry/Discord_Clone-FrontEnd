import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { friendsSelectors } from './slices/friendsSlice';
import { requestsSelectors } from './slices/requestsSlice';

// Memoized selector for friends list (returns same reference if unchanged)
export const selectFriends = createSelector(
    [(state: RootState) => friendsSelectors.selectAll(state)],
    (friends) => friends.map(friend => ({ ...friend }))
);

// Memoized selector for incoming friend requests for the current user
export const selectIncomingRequests = createSelector(
    [
        (state: RootState) => requestsSelectors.selectAll(state),
        (state: RootState) => state.auth.user?.id
    ],
    (requests, userId) =>
        requests.filter((req) => req?.to?.id === userId && req?.status === 'PENDING')
);

// Memoized selector for outgoing friend requests for the current user
export const selectOutgoingRequests = createSelector(
    [
        (state: RootState) => requestsSelectors.selectAll(state),
        (state: RootState) => state.auth.user?.id
    ],
    (requests, userId) =>
        requests.filter((req) => req?.from?.id === userId && req?.status === 'PENDING')
);
