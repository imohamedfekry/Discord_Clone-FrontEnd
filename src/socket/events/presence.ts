import { Socket } from 'socket.io-client';
import { AppDispatch } from '../../store';
import { SOCKET_EVENTS } from '../constants';
import { setPresenceStatus, setAllPresences } from '../../store/slices/presenceSlice';
import { PresenceStatus } from '../../types/models';

export const registerPresenceHandlers = (socket: Socket, dispatch: AppDispatch) => {
    socket.on(SOCKET_EVENTS.PRESENCE_UPDATE, (payload: { userId: string; status: PresenceStatus }) => {
        dispatch(setPresenceStatus(payload));
    });

    socket.on(SOCKET_EVENTS.PRESENCE_SYNC, (payload: Record<string, PresenceStatus>) => {
        dispatch(setAllPresences(payload));
    });
};
