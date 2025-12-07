import { Socket } from 'socket.io-client';
import { AppDispatch } from '../../store';
import { SOCKET_EVENTS } from '../constants';
import { addFriend, removeFriend, setFriends, updateFriend } from '../../store/slices/friendsSlice';
import { User } from '../../types/models';

export const registerFriendsHandlers = (socket: Socket, dispatch: AppDispatch) => {
    // Initial friends list
    socket.on(SOCKET_EVENTS.FRIENDS_LIST, (friends: User[]) => {
        console.log('👥 Received friends list:', friends);
        dispatch(setFriends(friends));
    });

    // When a friend request is accepted (YOU accept or SOMEONE accepts yours)
    socket.on(SOCKET_EVENTS.FRIEND_REQUEST_ACCEPTED, (payload: any) => {
        console.log('✅ Friend request accepted, adding friend:', payload);

        // The payload might contain the full friend object or just friend data
        const friend = payload.friend || payload.user || payload;

        if (friend && friend.id) {
            dispatch(addFriend(friend));

            // Show notification
            if (typeof window !== 'undefined') {
                console.log(`🎉 You are now friends with ${friend.username || friend.globalname || 'Unknown'}!`);
            }
        }
    });

    // When a friend is removed
    socket.on(SOCKET_EVENTS.FRIEND_REMOVED, (payload: { userId: string; friendId?: string }) => {
        const friendIdToRemove = payload.friendId || payload.userId;
        console.log('💔 Friend removed:', friendIdToRemove);
        dispatch(removeFriend(friendIdToRemove));
    });

    // When a friend's data is updated (e.g., username change, avatar change)
    socket.on('friend:updated', (payload: { id: string; changes: Partial<User> }) => {
        console.log('🔄 Friend updated:', payload);
        dispatch(updateFriend({ id: payload.id, changes: payload.changes }));
    });
};
