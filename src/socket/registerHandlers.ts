import { Socket } from 'socket.io-client';
import { AppDispatch } from '../store';
import { registerFriendsHandlers } from './events/friends';
import { registerRequestsHandlers } from './events/requests';
import { registerChatHandlers } from './events/chat';
import { registerPresenceHandlers } from './events/presence';
import { registerServerHandlers } from './events/servers';

export const registerSocketHandlers = (socket: Socket, dispatch: AppDispatch) => {
    registerFriendsHandlers(socket, dispatch);
    registerRequestsHandlers(socket, dispatch);
    registerChatHandlers(socket, dispatch);
    registerPresenceHandlers(socket, dispatch);
    registerServerHandlers(socket, dispatch);
};
