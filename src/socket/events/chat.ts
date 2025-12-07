import { Socket } from 'socket.io-client';
import { AppDispatch } from '../../store';
import { SOCKET_EVENTS } from '../constants';
import { addMessage, setTypingUser } from '../../store/slices/chatSlice';
import { Message } from '../../types/models';

export const registerChatHandlers = (socket: Socket, dispatch: AppDispatch) => {
    socket.on(SOCKET_EVENTS.MESSAGE_RECEIVED, (message: Message) => {
        dispatch(addMessage(message));
    });

    socket.on(SOCKET_EVENTS.TYPING_START, (payload: { channelId: string; userId: string }) => {
        dispatch(setTypingUser({ ...payload, isTyping: true }));
    });

    socket.on(SOCKET_EVENTS.TYPING_STOP, (payload: { channelId: string; userId: string }) => {
        dispatch(setTypingUser({ ...payload, isTyping: false }));
    });
};
