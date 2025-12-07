import { Socket } from 'socket.io-client';
import { AppDispatch } from '../../store';
import { SOCKET_EVENTS } from '../constants';
import { addServer, removeServer, addChannel, removeChannel } from '../../store/slices/serversSlice';
import { Server, Channel } from '../../types/models';

export const registerServerHandlers = (socket: Socket, dispatch: AppDispatch) => {
    socket.on(SOCKET_EVENTS.SERVER_JOINED, (server: Server) => {
        dispatch(addServer(server));
    });

    socket.on(SOCKET_EVENTS.SERVER_LEFT, (payload: { serverId: string }) => {
        dispatch(removeServer(payload.serverId));
    });

    socket.on(SOCKET_EVENTS.CHANNEL_CREATED, (channel: Channel) => {
        dispatch(addChannel(channel));
    });

    socket.on(SOCKET_EVENTS.CHANNEL_DELETED, (payload: { channelId: string }) => {
        dispatch(removeChannel(payload.channelId));
    });
};
