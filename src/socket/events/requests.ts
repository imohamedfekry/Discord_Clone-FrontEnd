import { Socket } from 'socket.io-client';
import { AppDispatch } from '../../store';
import { SOCKET_EVENTS } from '../constants';
import { addIncomingRequest, removeIncomingRequest, setRequests } from '../../store/slices/requestsSlice';
import { FriendRequest } from '../../types/models';

export const registerRequestsHandlers = (socket: Socket, dispatch: AppDispatch) => {
    // Initial requests list (both incoming and outgoing)
    socket.on(SOCKET_EVENTS.FRIENDS_REQUESTS_LIST, (requests: FriendRequest[]) => {
        console.log('📋 Received requests list:', requests);
        dispatch(setRequests(requests));
    });

    // When someone sends YOU a friend request
    socket.on(SOCKET_EVENTS.FRIEND_REQUEST_RECEIVED, (request: FriendRequest) => {
        console.log('📨 New friend request received:', request);
        dispatch(addIncomingRequest(request));

        // Show notification
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
            new Notification('New Friend Request', {
                body: `${request.sender?.username || 'Someone'} sent you a friend request`,
                icon: request.sender?.avatar || '/discord-icon.png'
            });
        }
    });

    // When SOMEONE ELSE accepts YOUR friend request
    socket.on(SOCKET_EVENTS.FRIEND_REQUEST_ACCEPTED, (payload: { requestId: string; friend?: any }) => {
        console.log('✅ Friend request accepted:', payload);
        dispatch(removeIncomingRequest(payload.requestId));

        // Show notification
        if (payload.friend && typeof window !== 'undefined') {
            console.log(`🎉 ${payload.friend.username} accepted your friend request!`);
        }
    });

    // When SOMEONE ELSE rejects YOUR friend request OR when YOU reject incoming request
    socket.on(SOCKET_EVENTS.FRIEND_REQUEST_REJECTED, (payload: { requestId: string }) => {
        console.log('❌ Friend request rejected:', payload);
        dispatch(removeIncomingRequest(payload.requestId));
    });

    // When YOU or SOMEONE ELSE cancels a friend request
    socket.on(SOCKET_EVENTS.FRIEND_REQUEST_CANCELLED, (payload: { requestId: string }) => {
        console.log('🚫 Friend request cancelled:', payload);
        dispatch(removeIncomingRequest(payload.requestId));
    });

    // Handle errors
    socket.on('friend:request:error', (error: { message: string }) => {
        console.error('❌ Friend request error:', error.message);
    });
};
